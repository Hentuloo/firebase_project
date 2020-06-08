import React, { FC, useCallback } from 'react';
import styled from 'styled-components';

import { RoomButton } from 'components/atoms';
import { useCollapseAnimation } from 'hooks/useCollapseAnimation';
import { PaginationArrows } from 'components/molecules';

const Wrapper = styled.div`
  width: 85%;
`;
const GroupWrapper = styled.div`
  width: 100%;
  height: 172px;
  overflow-y: hidden;
  ${({ theme }) => theme.mediaQuery.md} {
    height: 180px;
  }
  ${({ theme }) => theme.mediaQuery.vlg} {
    height: 205px;
  }
`;
const StyledRoomButton = styled(RoomButton)`
  width: 100%;
  margin: 6px auto;
`;
const useCollapseAnimationInit = {
  init: 0,
  defaultSkipCount: 4,
  activeCount: 4,
  minCount: 0,
};

interface RoomI {
  password?: string;
  title: string;
  gameKey: string;
}

export interface RoomsListProps {
  list: RoomI[];
  fetchNextRooms: (page: number) => void;
  refetch: () => void;
}

const RoomsList: FC<RoomsListProps> = ({
  list = [],
  fetchNextRooms,
  refetch,
}) => {
  const [ref, nextStep, prevStep, { from }] = useCollapseAnimation<
    HTMLDivElement
  >({ ...useCollapseAnimationInit, maxCount: list.length });

  const handleNextStep = useCallback(() => {
    const newFrom = from + useCollapseAnimationInit.activeCount;
    const nextPage =
      newFrom / useCollapseAnimationInit.activeCount + 1;

    if (
      list.length <
      newFrom + useCollapseAnimationInit.activeCount
    ) {
      fetchNextRooms(nextPage);
    }

    nextStep();
  }, [list.length, from, nextStep, fetchNextRooms]);

  const handlePrevStep = useCallback(() => {
    prevStep();
  }, [prevStep]);

  return (
    <Wrapper>
      <GroupWrapper ref={ref}>
        {list.map(({ title, gameKey, password }) => {
          const withPassword = !!password;
          return (
            <StyledRoomButton
              key={gameKey}
              number={withPassword ? undefined : 3}
              title={title}
              withKey={withPassword}
            />
          );
        })}
      </GroupWrapper>
      <PaginationArrows
        next={handleNextStep}
        prev={handlePrevStep}
        refresh={refetch}
      />
    </Wrapper>
  );
};

export default RoomsList;
