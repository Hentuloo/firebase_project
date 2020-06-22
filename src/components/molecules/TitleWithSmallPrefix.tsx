import React, { FC } from 'react';
import styled from 'styled-components';
import { BarDecorator } from 'components/atoms';

const Wrapper = styled.div``;
const SmallPrefix = styled.span`
  font-size: ${({ theme }) => theme.fs.xxs};
  margin-right: 8px;
`;
const Title = styled.span`
  ${BarDecorator}
  font-size: ${({ theme }) => theme.fs.m};
  font-weight:${({ theme }) => theme.fw[1]};
`;
export interface TitleWithSmallPrefixProps {
  prefix: string;
  title: string;
}

export const TitleWithSmallPrefix: FC<TitleWithSmallPrefixProps> = ({
  prefix,
  title,
  ...props
}) => {
  return (
    <Wrapper {...props}>
      <SmallPrefix>{prefix}</SmallPrefix> <Title>{title}</Title>
    </Wrapper>
  );
};
