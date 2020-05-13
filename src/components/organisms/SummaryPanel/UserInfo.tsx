import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Constants } from 'config/Constants';
import { ProfileImage } from 'components/atoms';
import { getUser } from 'store/selectors/user.selector';

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
const WinsLossesSummary = styled.span``;

const UserInfo: FC = () => {
  const { photoURL, displayName } = useSelector(getUser);

  return (
    <Wrapper>
      <CircleLink to={Constants.paths.settings.path}>
        <span className="sr-only">Przejdź do ustawień</span>
        <ProfileImage src={photoURL} />
      </CircleLink>
      <TextGroup>
        <Name>{displayName}</Name>
        <WinsLossesSummary>z/l: 12/1</WinsLossesSummary>
      </TextGroup>
    </Wrapper>
  );
};

export default UserInfo;
