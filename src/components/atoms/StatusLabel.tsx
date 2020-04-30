import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  grid-row-gap: 5px;
  text-align: center;
  font-family: ${({ theme }) => theme.ff[0]};
`;
const Value = styled.span`
  padding: 5px;
  border-radius: 45px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
  font-weight: ${({ theme }) => theme.fw[0]};
`;
const Title = styled.span`
  font-size: ${({ theme }) => theme.fs.xxxs};
`;

export interface StatusLabelProps {
  title: string;
  value: string | number;
}

export const StatusLabel: React.SFC<StatusLabelProps> = ({
  title,
  value,
  ...props
}) => {
  return (
    <Wrapper {...props}>
      <Title>{title}</Title>
      <Value>{value}</Value>
    </Wrapper>
  );
};
