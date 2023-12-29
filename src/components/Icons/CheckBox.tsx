import React from 'react';
import Checked from '@/assets/icons/ic-checked.svg';
import UnChecked from '@/assets/icons/ic-uncheck.svg';
import styled from 'styled-components';
import px2rem from '@/utils/px2rem';
import Text from '@/components/Text';
import IconSVG from '@/components/IconSVG';

interface CheckBoxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${px2rem(12)};
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: ${px2rem(24)};
  height: ${px2rem(24)};
`;

const CheckBox = ({ label, checked, onChange, className }: CheckBoxProps) => {
  return (
    <Container onClick={() => onChange(!checked)} className={className || ''}>
      <Box>
        {checked ? (
          <IconSVG color="text_primary" type="stroke" src={Checked} maxWidth="18" />
        ) : (
          <IconSVG color="text_primary" type="stroke" src={UnChecked} maxWidth="18" />
        )}
      </Box>
      <Text size="18">{label}</Text>
    </Container>
  );
};

export default CheckBox;
