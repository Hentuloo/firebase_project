import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import Tippy from '@tippyjs/react';
import crownIconSVG from 'assets/svg/icons/crownIcon.svg';
import { UserLabelProps } from './UserLabel';

const Wrapper = styled.div`
  width: 150px;
  display: grid;
  grid-template-columns: 1px 1fr;
  grid-row-gap: 8px;
  text-align: center;
  ${({ withImage }: { withImage: boolean }) =>
    withImage &&
    css`
      width: 200px;
      grid-column-gap: 20px;
      grid-template-columns: 30% 1fr;
    `}
`;
const UserImageWrapper = styled.div`
  grid-row: 1 / 4;
`;
const UserImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;
const BrandText = styled.span`
  color: ${({ theme }) => theme.color.brand[3]};
`;
const WinsInfoWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  text-align: end;
`;
const SmallIcon = styled.img`
  max-height: 17px;
`;

export interface UserLabelTooltipProviderProps
  extends UserLabelProps {
  children?: React.ReactElement<any>;
}

export const UserLabelTooltipProvider: FC<UserLabelTooltipProviderProps> = ({
  photoURL,
  displayName,
  isCreator,
  children,
}) => {
  return (
    <Tippy
      content={
        <Wrapper withImage={!!photoURL}>
          <UserImageWrapper>
            {photoURL && <UserImage src={photoURL} />}
          </UserImageWrapper>
          {isCreator && <BrandText>Założyciel pokoju</BrandText>}
          <span>{displayName}</span>
          <WinsInfoWrapper>
            <span>42</span>
            <SmallIcon src={crownIconSVG} />
          </WinsInfoWrapper>
        </Wrapper>
      }
      placement="left"
      popperOptions={{
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 40],
            },
          },
        ],
      }}
    >
      {children}
    </Tippy>
  );
};
