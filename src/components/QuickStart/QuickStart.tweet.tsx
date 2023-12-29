import BaseModal from '@/components/BaseModal';
import styled from 'styled-components';
import { Input } from '@/components/Input';
import { TwitterShareButton } from 'react-share';
import React from 'react';
import px2rem from '@/utils/px2rem';
import Button from '@/components/Button';
import { Twitter } from 'react-feather';
import Text from '@/components/Text';
import { useFormik } from 'formik';
import { getErrorMessage, opacify } from '@/utils';
import toast from 'react-hot-toast';
import client from '@/services/client';
import { QuickStartTypeEnum } from '@/interface/services/client';
import sleep from '@/utils/sleep';

interface IProps {
  show: boolean;
  onHide: () => void;
  onSuccess: () => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${px2rem(24)};
  margin-top: ${px2rem(16)};
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${px2rem(12)};
  button {
    min-width: ${px2rem(150)};
  }
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => opacify(10, theme.text_primary)};
  margin: ${px2rem(16)} 0;
`;

interface IFormikValues {
  tweetUrl: string;
}

const QuickStartTweet = (props: IProps) => {
  const { show, onHide, onSuccess } = props;

  const onValidate = (values: IFormikValues) => {
    const errors: Record<string, string> = {};
    if (!values.tweetUrl) {
      errors.tweetUrl = 'Tweet URL is required';
    } else if (!values.tweetUrl.includes('https://twitter.com')) {
      errors.tweetUrl = 'Invalid tweet URL';
    }
    return errors;
  };
  const onSubmit = async (values: IFormikValues) => {
    try {
      const isSuccess = await client.updateQuickStart(QuickStartTypeEnum.TWITTER, values.tweetUrl);
      await sleep(1);
      if (isSuccess) {
        toast.success('Successfully');
        onSuccess();
      }
    } catch (error) {
      const { message } = getErrorMessage(error);
      toast.error(message);
    }
  };

  const formik = useFormik({
    initialValues: {
      tweetUrl: '',
    } as IFormikValues,
    validate: onValidate,
    onSubmit: onSubmit,
  });

  return (
    <BaseModal show={show} handleClose={onHide} title="Share a tweet" width={600}>
      <Container>
        <InputBox>
          <Text size="20" fontWeight="semibold">
            Step 1
          </Text>
          <TwitterShareButton
            url={`I just launched a new Bitcoin L2 blockchain at @NewBitcoinCity!\n\nCome and create your own.\nhttps://newbitcoincity.com/tc\n\nPowered by Bitcoin Virtual Machine - A no-code tool for building a full-featured Bitcoin L2 blockchain.\n`}
            hashtags={[]}
            windowWidth={1000}
            windowHeight={800}
            children={
              <Button sizes="stretch">
                <Twitter size={20} />
                Share a tweet
              </Button>
            }
          />
        </InputBox>
        <Line />
        <form id="tweet_url" onSubmit={formik.handleSubmit}>
          <InputBox>
            <Text size="20" fontWeight="semibold">
              Step 2
            </Text>
            <Input
              label="Paste the URL of the tweet"
              placeholder="Tweet URL"
              value={formik.values.tweetUrl}
              id="tweetUrl"
              name="tweetUrl"
              onChange={formik.handleChange}
              error={formik.errors.tweetUrl}
              rightView={
                <Button
                  type="submit"
                  loading={{
                    isLoading: formik.isSubmitting,
                  }}
                  disabled={formik.isSubmitting}
                >
                  Confirm
                </Button>
              }
            />
          </InputBox>
        </form>
      </Container>
    </BaseModal>
  );
};

export default QuickStartTweet;
