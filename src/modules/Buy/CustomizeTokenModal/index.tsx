import BaseModal from '@/components/BaseModal';
import Button from '@/components/Button';
import * as S from '@/components/ContactModal/styled';
import { Input } from '@/components/Input';
import { getErrorMessage } from '@/utils';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';

export interface IFormValues {
  totalSupply: string;
  receivingAddress: string;
}

interface IProps {
  show: boolean;
  onClose?: () => void;
  onSuccess?: () => Promise<void>;
}

const CustomizeTokenModal = (props: IProps) => {
  const { show, onClose } = props;

  const validateForm = (values: IFormValues) => {
    const errors: Record<string, string> = {};
    if (!values.totalSupply) {
      errors.totalSupply = 'Total supply is required.';
    }
    if (!values.receivingAddress) {
      errors.receivingAddress = 'Receiving address is required.';
    }
    return errors;
  };

  const handleSubmit = async (values: IFormValues) => {
    try {
      // await client.submitContact(values);
      // toast.success('Submit successfully');
      // setStep('success');
    } catch (error) {
      const { message } = getErrorMessage(error);
      toast.error(message);
    }
  };

  const formik = useFormik({
    initialValues: {
      totalSupply: '',
      receivingAddress: '',
    } as IFormValues,
    onSubmit: handleSubmit,
    validate: validateForm,
  });

  return (
    <BaseModal show={show} handleClose={onClose} title="Custom Native Token">
      <form id="contact" onSubmit={formik.handleSubmit}>
        <S.Container>
          <S.InputBox>
            <Input
              label="Total supply"
              id="totalSupply"
              error={formik.errors.totalSupply}
              placeholder=""
              isRequired={true}
              type="number"
              autoFocus={true}
              autoComplete="off"
              value={formik.values.totalSupply}
              spellCheck={false}
              onChange={(e: any) => {
                formik.handleChange(e);
                formik.validateField('totalSupply');
              }}
              onWheel={(e: any) => e?.target?.blur()}
            />
            <Input
              label="Receiving Address"
              id="receivingAddress"
              error={formik.errors.receivingAddress}
              placeholder=""
              isRequired={true}
              type="text"
              autoFocus={false}
              autoComplete="off"
              spellCheck={false}
              onChange={formik.handleChange}
              onWheel={(e: any) => e?.target?.blur()}
            />
            <Button
              sizes="stretch"
              type="submit"
              className="submit-button"
              disabled={formik.isSubmitting}
              loading={{
                isLoading: formik.isSubmitting,
              }}
            >
              OK
            </Button>
          </S.InputBox>
        </S.Container>
      </form>
    </BaseModal>
  );
};

export default CustomizeTokenModal;
