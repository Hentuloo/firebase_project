import React, { FC } from 'react';
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

const ButtonsGroup: FC = () => {
  const [ref, nextStep, prevStep] = useCollapseAnimation<
    HTMLDivElement
  >({
    initStep: 0,
    defaultSkipCount: 4,
    activeCount: 4,
    maxCount: 20,
    minCount: 0,
  });
  return (
    <Wrapper>
      <GroupWrapper ref={ref}>
        <StyledRoomButton number={5} title="1 Siem 3213 21321a" />
        <StyledRoomButton number={2} title="1 Siema" />
        <StyledRoomButton withKey title="1 S12 312 312iema" />
        <StyledRoomButton
          number={2}
          title="1 Siemsadf sadf asds adfasd fasdf asdf asdf fa"
        />
        <StyledRoomButton number={2} title="1 Siema" />
        <StyledRoomButton number={2} title="1 Siema" />
        <StyledRoomButton number={2} title="1 Siasdfaema" />
        <StyledRoomButton withKey title="1 Siema" />
        <StyledRoomButton number={2} title="1 Sieasdf sdafasdfma" />
        <StyledRoomButton number={2} title="1 Siema" />
        <StyledRoomButton
          number={2}
          title="1Siemaasdfasdfasdfasdfasdfa"
        />
        <StyledRoomButton number={2} title="1 Siasdf dasf asdema" />
        <StyledRoomButton number={2} title="1 asdfadfs asdfadfs" />
      </GroupWrapper>
      <PaginationArrows
        next={() => nextStep()}
        prev={() => prevStep()}
      />
    </Wrapper>
  );
};

export default ButtonsGroup;