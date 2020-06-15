import React, { FC } from 'react';
import styled from 'styled-components';
import { CircleImage } from 'components/atoms';

const Wrapper = styled.div`
  display: grid;
  min-height: 60px;
  grid-auto-flow: column;
  align-items: center;
`;
const StyledCircleImage = styled(CircleImage)`
  width: 50px;
  height: 50px;
`;

export interface UserLabelProps {
  photoURL?: string;
  displayName: string;
  id: string;
}

export const UserLabel: FC<UserLabelProps> = ({
  photoURL,
  displayName,
  // id,
  ...props
}) => {
  return (
    <Wrapper {...props}>
      <StyledCircleImage src={photoURL} />
      <span>{displayName}</span>
    </Wrapper>
  );
};
