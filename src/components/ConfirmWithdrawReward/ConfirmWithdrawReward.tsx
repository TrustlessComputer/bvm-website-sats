import BaseModal from '@/components/BaseModal';
import * as S from './styled';
import Text from '@/components/Text';
import Button from '@/components/Button';
import React from 'react';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import client from '@/services/client';
import sleep from '@/utils/sleep';
import { useAppSelector } from '@/state/hooks';
import { orderListSelector } from '@/state/order/selector';
import { useFetchUserData } from '@/state/user/hooks';
import { getErrorMessage } from '@/utils';

interface IProps {
  show: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

interface IFormValues {}

const ConfirmWithdrawReward = (props: IProps) => {
  const { show, onClose, onSuccess } = props;
  const orders = useAppSelector(orderListSelector);
  const onFetchData = useFetchUserData();

  const handleSubmit = async () => {
    try {
      await client.withdrawRewards(orders);
      await sleep(1);
      await onFetchData();
      await sleep(1);
      toast.success('Withdraw reward successfully.');
      onClose();
      onSuccess && onSuccess();
    } catch (error) {
      const { message } = getErrorMessage(error);
      toast.error(message);
    }
  };

  const formik = useFormik({
    initialValues: {} as IFormValues,
    onSubmit: handleSubmit,
  });

  return (
    <BaseModal show={show} handleClose={onClose} title="Withdraw reward">
      <form onSubmit={formik.handleSubmit} id="withdraw-reward">
        <S.Container>
          <Text>
            You are about to withdraw rewards from your account. This action is irreversible. Are you sure you want to
            withdraw rewards?
          </Text>
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

export default ConfirmWithdrawReward;
