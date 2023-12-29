import BaseModal from '@/components/BaseModal';
import * as S from './styled';
import Text from '@/components/Text';
import Button from '@/components/Button';
import React from 'react';
import { useAppSelector } from '@/state/hooks';
import { accountInfoSelector } from '@/state/user/selector';
import { useFormik } from 'formik';
import { Input } from '@/components/Input';
import toast from 'react-hot-toast';
import client from '@/services/client';
import BigNumber from 'bignumber.js';
import sleep from '@/utils/sleep';
import { useFetchUserData } from '@/state/user/hooks';

interface IProps {
  show: boolean;
  onClose: () => void;
}

interface IFormValues {
  amount: string;
}

const ConfirmWithdraw = (props: IProps) => {
  const { show, onClose } = props;
  const accountInfo = useAppSelector(accountInfoSelector);
  const onFetchData = useFetchUserData();

  const validateForm = (values: IFormValues): Record<string, string> => {
    const errors: Record<string, string> = {};
    const originalAmount = new BigNumber(values.amount).multipliedBy(1e18);
    if (!values.amount) {
      errors.amount = 'Required.';
    } else if (originalAmount.gt(accountInfo?.withdrawableBalance || 0)) {
      errors.amount = 'Amount must be less than withdrawable balance.';
    }
    return errors;
  };

  const handleSubmit = async (values: IFormValues) => {
    try {
      await client.withdrawFund({
        amount: new BigNumber(values.amount).multipliedBy(1e18).toFixed(),
      });
      await sleep(2);
      setTimeout(() => {
        onFetchData();
      }, 2000);
      toast.success('Withdraw successfully.');
      onClose();
    } catch (error) {
      let errorMessage = 'Something went wrong.';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      toast.error(errorMessage);
    }
  };

  const formik = useFormik({
    initialValues: {
      amount: '',
    } as IFormValues,
    onSubmit: handleSubmit,
    validate: validateForm,
  });

  return (
    <BaseModal show={show} handleClose={onClose} title="Withdraw funds" width={600}>
      <form onSubmit={formik.handleSubmit} id="withdraw-fund">
        <S.Container>
          <Text>
            You are about to withdraw funds from your account. Please confirm that you want to withdraw funds to your
            wallet.
          </Text>
          <Input
            id="amount"
            isRequired={true}
            onChange={formik.handleChange}
            label="Withdraw amount"
            subLabel={'Max ' + accountInfo?.withdrawableBalanceFormatted + ' BVM'}
            placeholder="Enter amount"
            autoFocus={true}
            type="number"
            error={formik.errors.amount}
            value={formik.values.amount}
            onMax={() => {
              formik.setFieldValue('amount', accountInfo?.withdrawableBalanceFormatted || '');
            }}
          />
          <S.Actions>
            <Button variants="outline" sizes="stretch" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button
              sizes="stretch"
              type="submit"
              disabled={formik.isSubmitting}
              loading={{
                isLoading: formik.isSubmitting,
              }}
            >
              Withdraw
            </Button>
          </S.Actions>
        </S.Container>
      </form>
    </BaseModal>
  );
};

export default ConfirmWithdraw;
