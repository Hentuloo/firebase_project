import React, { FC } from 'react';
import styled from 'styled-components';
import { CircleImage } from 'components/atoms';
import creatorIconSvg from 'assets/svg/creatorIcon.svg';
import { UserLabelInfo } from 'types/GameSettings';
import { UserLabelTooltipProvider } from './UserLabelTooltipProvider';

const Wrapper = styled.div`
  position: relative;
  display: grid;
  min-height: 60px;
  grid-auto-flow: column;
  align-items: center;
`;
const StyledCircleImage = styled(CircleImage)`
  width: 50px;
  height: 50px;
`;
const CreatorIcon = styled.img`
  position: absolute;
  left: 0%;
  top: 100%;
  width: 74px;
  z-index: -1;
  transform: translate(-14px, -75%);
`;

export interface UserLabelProps extends Omit<UserLabelInfo, 'uid'> {}

export const UserLabel: FC<UserLabelProps> = ({
  photoURL,
  displayName,
  isCreator,
  wins,
  ...props
}) => {
  return (
    <UserLabelTooltipProvider
      photoURL={photoURL}
      displayName={displayName}
      isCreator={isCreator}
      wins={wins}
    >
      <Wrapper {...props}>
        <StyledCircleImage src={photoURL} />
        <span>{displayName}</span>
        {isCreator && <CreatorIcon src={creatorIconSvg} />}
      </Wrapper>
    </UserLabelTooltipProvider>
  );
};
