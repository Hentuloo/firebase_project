import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import crownIconSVG from 'assets/svg/icons/crownIcon.svg';
import { Constants } from 'config/Constants';
import { ProfileImage } from 'components/atoms';
import { getUser } from 'store/selectors/user.selector';
import Tippy from '@tippyjs/react';

const Wrapper = styled.div`
  display: grid;
  height: 80px;
  grid-column: 1 / -1;
  grid-template-columns: 80px 1fr;
  column-gap: 35px;
  padding: 0px 50px;
`;
const CircleLink = styled(Link)`
  padding: 5px;
  display: none;
  ${({ theme }) => theme.mediaQuery.md} {
    display: block;
  }
`;
const TextGroup = styled.div`
  display: grid;
  align-content: space-around;
`;
const Name = styled.span``;
const WinsInfoWrapper = styled.div`
  text-align: center;
  font-weight: ${({ theme }) => theme.fw[1]};
  font-size: ${({ theme }) => theme.fs.s};
  color: ${({ theme }) => theme.color.brand[3]};
  align-items: center;
  ${({ theme }) => theme.mediaQuery.md} {
    width: 100px;
  }
`;
const SmallIcon = styled.img`
  max-height: 17px;
`;

const UserInfo: FC = () => {
  const { photoURL, displayName, wins } = useSelector(getUser);

  return (
    <Wrapper>
      <Tippy content="Ustawienia">
        <CircleLink to={Constants.paths.settings.path}>
          <span className="sr-only">Przejdź do ustawień</span>
          <ProfileImage src={photoURL} />
        </CircleLink>
      </Tippy>
      <TextGroup>
        <Name>{displayName}</Name>
        <Tippy content="Ilość wygranych rozgrywek online">
          <WinsInfoWrapper>
            <span>{wins}</span>
            <SmallIcon src={crownIconSVG} />
          </WinsInfoWrapper>
        </Tippy>
      </TextGroup>
    </Wrapper>
  );
};

export default UserInfo;
