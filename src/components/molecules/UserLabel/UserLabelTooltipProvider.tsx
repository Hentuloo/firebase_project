import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import Tippy from '@tippyjs/react';
import crownIconSVG from 'assets/svg/icons/crownIcon.svg';
import { SmallImageWithText } from 'components/atoms/SmallImageWithTextProps';
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
const StyledSmallImageWithText = styled(SmallImageWithText)`
  width: 90px;
  grid-template-columns: 30px auto;
  font-weight: ${({ theme }) => theme.fw[1]};
  font-size: ${({ theme }) => theme.fs.s};
  color: ${({ theme }) => theme.color.brand[3]};
  margin: 0px auto;
`;

export interface UserLabelTooltipProviderProps
  extends UserLabelProps {
  children?: React.ReactElement<any>;
}

export const UserLabelTooltipProvider: FC<UserLabelTooltipProviderProps> = ({
  photoURL,
  displayName,
  isCreator,
  wins,
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
          <StyledSmallImageWithText src={crownIconSVG} text={wins} />
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
