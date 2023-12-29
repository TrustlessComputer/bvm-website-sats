import * as S from '@/components/ContactModal/styled';
import BaseModal from '@/components/BaseModal';
import { useFormik } from 'formik';
import { Input } from '@/components/Input';
import Text from '@/components/Text';
import Button from '@/components/Button';
import { Row } from '@/components/Row';
import IconSVG from '@/components/IconSVG';
import configs from '@/configs';
import client from '@/services/client';
import { getErrorMessage } from '@/utils';
import toast from 'react-hot-toast';
import React from 'react';

export interface IFormValues {
  discord: string;
  about: string;
  scheduling: string;
}

interface IProps {
  show: boolean;
  handleClose: () => void;
}

interface ISuccessProps {
  title: string;
  link: string;
  icon: string;
}

const Contents = [
  'Demo product of interest.',
  'Access custom pricing including higher throughput, volume discounts and more.',
  'Get started faster with dedicated support services.',
  'Scale with confidence with solution design and usage optimisation.',
];

const SuccessLinks: Array<ISuccessProps> = [
  {
    title: 'Read the Developer Guides',
    link: configs.DOCS_TRUSTLESS_URL,
    icon: '/ic-docs.svg',
  },
  {
    title: 'Follow us on Twitter',
    link: configs.TWITTER_URL,
    icon: '/ic-twitter.svg',
  },
  {
    title: 'Join our Discord',
    link: configs.DISCORD_URL,
    icon: '/ic-discord.svg',
  },
];

const ContactModal = (props: IProps) => {
  const { show, handleClose } = props;
  const [step, setStep] = React.useState<'submit' | 'success'>('submit');

  const validateForm = (values: IFormValues) => {
    const errors: Record<string, string> = {};
    if (!values.discord) {
      errors.discord = 'Required.';
    }
    if (!values.about) {
      errors.about = 'Required.';
    }
    return errors;
  };

  const handleSubmit = async (values: IFormValues) => {
    try {
      await client.submitContact(values);
      toast.success('Submit successfully');
      setStep('success');
    } catch (error) {
      const { message } = getErrorMessage(error);
      toast.error(message);
    }
  };

  const formik = useFormik({
    initialValues: {
      discord: '',
      about: '',
      scheduling: '',
    } as IFormValues,
    onSubmit: handleSubmit,
    validate: validateForm,
  });

  const renderContent = (content: string) => {
    return (
      <Row key={content} gap={16} wrap="nowrap">
        <IconSVG
          src={configs.CDN_APP_ICON_URL + '/check-circle.svg'}
          color="button_secondary"
          type="stroke"
          maxWidth="26"
        />
        <Text size="18">{content}</Text>
      </Row>
    );
  };

  const renderSuccessLink = (item: ISuccessProps) => {
    return (
      <S.SuccessLinkBox
        key={item.title}
        onClick={() => {
          window.open(item.link, '_blank');
        }}
      >
        <IconSVG src={configs.CDN_APP_ICON_URL + item.icon} maxWidth="32" />
        <Text>{item.title}</Text>
      </S.SuccessLinkBox>
    );
  };

  return (
    <BaseModal show={show} handleClose={handleClose} title="" width={step === 'submit' ? 1200 : 700}>
      <form id="contact" onSubmit={formik.handleSubmit}>
        <S.Container>
          {step === 'submit' && (
            <S.IntroduceBox>
              <Text size="38" fontWeight="semibold">
                Speak to an expert
              </Text>
              <Text size="22" fontWeight="semibold">
                Our team can help you:
              </Text>
              <div className="content">{Contents.map(renderContent)}</div>
            </S.IntroduceBox>
          )}
          {step === 'submit' ? (
            <S.InputBox>
              <Input
                label="Tell us about what you are building"
                id="about"
                error={formik.errors.about}
                isRequired={true}
                isTextArea={true}
                placeholder="Detail your use case"
                onChange={formik.handleChange}
              />
              <Input
                label="Twitter"
                id="discord"
                error={formik.errors.discord}
                placeholder="Twitter for DMs"
                isRequired={true}
                onChange={formik.handleChange}
              />
              {/*<Input*/}
              {/*  label="Scheduling Link"*/}
              {/*  id="scheduling"*/}
              {/*  error={formik.errors.scheduling}*/}
              {/*  isRequired={false}*/}
              {/*  isTextArea={true}*/}
              {/*  placeholder="Calendly, Acuity, Doodle, etc."*/}
              {/*/>*/}
              <Button
                sizes="stretch"
                type="submit"
                className="submit-button"
                disabled={formik.isSubmitting}
                loading={{
                  isLoading: formik.isSubmitting,
                }}
              >
                Submit
              </Button>
            </S.InputBox>
          ) : (
            <S.SuccessBox>
              <IconSVG src={configs.CDN_APP_ICON_URL + '/ic-success.svg'} maxWidth="80" />
              <Text size="24" fontWeight="semibold" align="center">
                Submission Received
              </Text>
              <Text align="center" className="mb-12">
                Thanks for getting in touch with us. Someone from our team will be contact with you shortly. In the
                meantime, checkout some useful resources.
              </Text>
              {SuccessLinks.map(renderSuccessLink)}
            </S.SuccessBox>
          )}
        </S.Container>
      </form>
    </BaseModal>
  );
};

export default ContactModal;
