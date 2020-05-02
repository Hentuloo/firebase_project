import React, { useState } from 'react';
import styled from 'styled-components';
import { TypingInput, Hands } from 'components/organisms';
import { LoadingBar } from 'components/atoms';

import { Controllers } from './Controllers';

const Wrapper = styled.div`
  position: relative;
  display: grid;
  height: 100%;
  width: 100%;
  max-width: 800px;
  grid-template-rows: 1fr 70px 50px;
  justify-content: center;
  align-self: center;
  grid-column-gap: 25px;
  margin: 0px auto;
  ${({ theme }) => theme.mediaQuery.md} {
    grid-template-rows: 1fr 200px 50px;
    grid-template-columns: 40px 1fr;
  }
`;
const StyledTypingInput = styled(TypingInput)`
  align-self: center;
  ${({ theme }) => theme.mediaQuery.md} {
    grid-column: 2/-1;
  }
`;
const StyledLoadingBar = styled(LoadingBar)`
  position: absolute;
  width: 80%;
  height: 10px;
  max-width: 550px;
  bottom: 1%;
  left: 50%;
  transform: translate(-50%, 0%);
  ${({ theme }) => theme.mediaQuery.md} {
    grid-column: 1/-1;
  }
`;
const StyledHands = styled(Hands)`
  display: none;
  ${({ theme }) => theme.mediaQuery.md} {
    justify-self: center;
    grid-column: 1/-1;
    display: block;
  }
`;

export interface TypingControllersProps {
  text: string;
  letters: string[];
}

const TypingControllers: React.SFC<TypingControllersProps> = ({
  text,
}) => {
  const [time, setTime] = useState<number>(3);
  return (
    <Wrapper>
      <Controllers time={time} setTime={setTime} />
      <StyledTypingInput
        text={text}
        time={time}
        render={({ cursor, timeSteps, initialTimeSteps }) => (
          <>
            <StyledHands text={text} cursor={cursor} />
            <StyledLoadingBar
              green
              easing="linear"
              duration={1}
              progress={Number(
                ((timeSteps / initialTimeSteps) * 100).toFixed(2),
              )}
            />
          </>
        )}
      />
    </Wrapper>
  );
};

export default TypingControllers;
