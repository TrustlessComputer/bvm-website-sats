import BaseModal from '@/components/BaseModal';
import * as S from './styled';
import { useFormik } from 'formik';
import { Input } from '@/components/Input';
import Button from '@/components/Button';
import Text from '@/components/Text';
import client from '@/services/client';
import { getErrorMessage } from '@/utils';
import toast from 'react-hot-toast';
import React from 'react';
import { Spinner } from '@/components/Spinner';
import { throttle } from 'lodash';
import { Row } from '../Row';
import { ArrowLeft } from 'react-feather';
import { useAppSelector } from '@/state/hooks';
import { themeSelector } from '@/state/application/selector';
import { accountInfoSelector } from '@/state/user/selector';

interface IProps {
  show: boolean;
  onClose: () => void;
  onSuccess: () => Promise<void>;
}

interface IFormValues {
  email: string;
  verifyCode: string;
  step: 'submit' | 'verify';
}

const EmailVerifier = (props: IProps) => {
  const { show, onClose, onSuccess } = props;
  const [reSending, setReSending] = React.useState(false);
  const theme = useAppSelector(themeSelector);
  const accountInfo = useAppSelector(accountInfoSelector);

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validateForm = (values: IFormValues): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (values.step === 'submit') {
      console.log(values.email);
      if (!values.email) {
        errors.email = 'Required.';
      } else if (!validateEmail(values.email)) {
        errors.email = 'Invalid email.';
      }
      if (errors.verifyCode) {
        delete errors.verifyCode;
      }
    } else if (values.step === 'verify') {
      if (errors.email) {
        delete errors.email;
      }
      if (!values.verifyCode) {
        errors.verifyCode = 'Required.';
      }
    }
    return errors;
  };

  const onSubmitEmail = async (values: IFormValues) => {
    await client.submitEmail(values.email);
  };

  const onSubmitVerify = async (values: IFormValues) => {
    await client.verifyEmail({
      token: values.verifyCode,
      email: values.email,
    });
  };

  const tryAgain = async () => {
    if (reSending) return;
    setReSending(true);
    try {
      await onSubmitEmail(formik.values);
    } catch (error) {
      const { message } = getErrorMessage(error);
      toast.error(message);
    } finally {
      setReSending(false);
    }
  };

  const onSubmit = async (values: IFormValues) => {
    try {
      if (values.step === 'submit') {
        await onSubmitEmail(values);
        await formik.setFieldValue('step', 'verify');
      } else if (values.step === 'verify') {
        await onSubmitVerify(values);
        await onSuccess();
      }
    } catch (error) {
      const { message } = getErrorMessage(error);
      toast.error(message);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: accountInfo?.email || '',
      verifyCode: '',
      step: accountInfo?.email ? 'verify' : 'submit',
    } as IFormValues,
    validate: validateForm,
    onSubmit,
  });

  return (
    <BaseModal
      show={show}
      handleClose={onClose}
      title={
        formik.values.step === 'verify' ? (
          <Row align="center" gap={16}>
            <S.Back
              onClick={() => {
                formik.setFieldValue('step', 'submit');
                formik.setFieldValue('verifyCode', '');
              }}
            >
              <ArrowLeft size={20} color={theme.text_primary} />
            </S.Back>
            <Text size="26" fontWeight="semibold">
              Verify Email
            </Text>
          </Row>
        ) : (
          <Text size="26" fontWeight="semibold">
            Verify Email
          </Text>
        )
      }
    >
      <form onSubmit={formik.handleSubmit} id="email-verification">
        <S.Container>
          {formik.values.step === 'submit' ? (
            <Input
              label="Email"
              type="text"
              id="email"
              placeholder="Enter your email"
              onChange={formik.handleChange}
              autoFocus={true}
              value={formik.values.email}
              error={formik.errors.email}
            />
          ) : (
            <div>
              <Input
                label="Verification code have been sent to your email"
                type="text"
                id="email"
                onChange={formik.handleChange}
                isViewOnly={true}
                isRequired={false}
                value={formik.values.email}
              />
              <S.Spacer />
              <Input
                label="Verification code"
                type="number"
                id="verifyCode"
                placeholder="Enter your verification code"
                autoFocus={true}
                onChange={formik.handleChange}
                value={formik.values.verifyCode}
                error={formik.touched.verifyCode && formik.errors.verifyCode}
                autoComplete="off"
                spellCheck={false}
                onWheel={(e: any) => e?.target?.blur()}
              />
            </div>
          )}
          <Button
            type="submit"
            sizes="stretch"
            className="submit-btn"
            disabled={formik.isSubmitting || reSending}
            loading={{
              isLoading: formik.isSubmitting,
            }}
          >
            {formik.values.step === 'submit' ? 'Submit' : 'Verify'}
          </Button>
          {formik.values.step === 'verify' && (
            <S.ResendCode>
              <Row gap={16}>
                <Text size="12">
                  Didn't receive the code?
                  <span className="action" onClick={throttle(tryAgain, 1000)}>
                    Resend
                  </span>
                </Text>
                {reSending && <Spinner size={10} />}
              </Row>
            </S.ResendCode>
          )}
        </S.Container>
      </form>
    </BaseModal>
  );
};

export default EmailVerifier;
