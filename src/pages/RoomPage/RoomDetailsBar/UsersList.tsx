import React, { FC } from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { Constants } from 'config/Constants';
import { getActiveRoom } from 'store/selectors/rooms.selector';

const Wrapper = styled.div``;
const ActiveUsers = styled.ul`
  display: grid;
  grid-auto-rows: 50px;
  grid-row-gap: 5px;
`;
const UserElement = styled.li`
  display: grid;
  grid-template-columns: 50px 1fr;
  grid-column: 1/-1;
  align-items: center;
  text-align: center;
`;
const Icon = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  grid-column: 1 / span 1;
  grid-row: 1 / span 1;
`;
const IconImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const UsersList: FC = () => {
  const { users } = useSelector(getActiveRoom);

  return (
    <Wrapper>
      <ActiveUsers>
        {users.map(({ uid: userId, displayName, photoURL }) => {
          return (
            <UserElement key={userId}>
              <span>{displayName}</span>
              <Icon>
                <IconImage
                  src={photoURL || Constants.default.profilePicture}
                  alt={`${displayName} - ikona`}
                />
              </Icon>
            </UserElement>
          );
          // if (creator === userId && uid === userId) {
          //   return 'Jestem założycielem!';
          // }
          // if (creator === userId) {
          //   return 'To założyciel';
          // }
          // if (uid === userId) {
          //   return 'to ja';
          // }
          // return userId;
        })}
      </ActiveUsers>
    </Wrapper>
  );
};

export default UsersList;
