import React, { FC, useCallback } from 'react';
import styled from 'styled-components';
import { RoomsPanel } from 'components/organisms';
import { SmallImageWithText } from 'components/atoms/SmallImageWithTextProps';
import usersIconSVG from 'assets/svg/icons/UsersIcon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { updateGaneralStateUsers } from 'store/actions/generalState.actions';
import { getOnlineUsersNumber } from 'store/selectors/generalSettings.selector';

const Wrapper = styled.div`
  display: grid;
  width: 80%;
  max-width: 290px;
  min-height: 400px;
  grid-template-rows: auto 1fr;
  grid-column: 1/-1;
  margin: 30px auto;
  ${({ theme }) => theme.mediaQuery.md} {
    max-width: 340px;
    grid-column: 1 / span 1;
    grid-row: 2 / span 1;
    margin: 0px auto;
  }
`;
const StyledSmallImageWithText = styled(SmallImageWithText)`
  width: 60px;
  font-size: ${({ theme }) => theme.fs.xxs};
  margin: 0px auto;
`;
export interface RoomsCardProps {}

export const RoomsCard: FC<RoomsCardProps> = ({ ...props }) => {
  const dispatch = useDispatch();
  const onlineUsers = useSelector(getOnlineUsersNumber);

  const updateActiveUsersNumber = useCallback(() => {
    dispatch(updateGaneralStateUsers());
  }, [dispatch]);

  return (
    <Wrapper {...props}>
      <StyledSmallImageWithText
        src={usersIconSVG}
        text={onlineUsers}
        labelText="Dostępni gracze na serwerze"
      />
      <RoomsPanel onRoomsRefetch={updateActiveUsersNumber} />
    </Wrapper>
  );
};
