import Text from '@/components/Text';
import { Slider } from 'antd';
import Section from '../components/Section';
import { useBuyProvider } from '../providers/Buy.hook';
import * as S from '../styled';
import { dayDescribe } from '../Buy.helpers';

const WithdrawalPeriodSection = () => {
  const { withdrawalPeriodSelected, setWithdrawalPeriodSelected } = useBuyProvider();

  const onChange = (value: number) => {
    if (isNaN(value)) {
      return;
    }
    setWithdrawalPeriodSelected(value);
  };

  return (
    <Section
      title={'Withdrawal Period'}
      description={'Which withdrawal period is right for you?'}
      descriptionDetail={{
        title: 'Withdrawal Period',
        content: (
          <p>
            If you've selected Optimistic Rollups as your rollup protocol, you will need to determine a challenge period
            for your users' withdrawals. This entails requiring them to wait until the challenge period has passed
            before they can withdraw the funds held in escrow on Bitcoin Virtual Machine Layer 1.
            <br />
            <p className="mt-12">
              The challenge period must be a value greater than zero, as it takes time for an individual (referred to as
              the challenger) to identify an invalid state root claim and subsequently initiate the challenge process.
              Presently, you have the option to select a period lasting from 1 hour to 7 days.
            </p>
          </p>
        ),
      }}
    >
      <S.Section>
        <Slider
          min={0}
          max={7}
          onChange={onChange}
          tooltip={{ placement: 'top', formatter: value => `${value} ${value === 1 ? 'day' : 'days'}` }}
          value={Number(withdrawalPeriodSelected ?? 0)}
          step={0.1}
        />
        <Text size="18" fontWeight="medium" align="left">
          {`${dayDescribe(withdrawalPeriodSelected).str}`}
        </Text>
      </S.Section>
    </Section>
  );
};

export default WithdrawalPeriodSection;
