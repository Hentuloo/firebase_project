import React from 'react';
import styled from 'styled-components';
import { TypingInput, Hands } from 'components/organisms';
import { LoadingBar } from 'components/atoms';

const Wrapper = styled.div`
  position: relative;
  display: grid;
  height: 100%;
  grid-template-rows: 1fr 200px 50px;
  justify-content: center;
  align-self: center;
`;
const StyledTypingInput = styled(TypingInput)`
  align-self: center;
`;
const StyledLoadingBar = styled(LoadingBar)`
  position: absolute;
  width: 80%;
  height: 10px;
  max-width: 550px;
  bottom: 1%;
  left: 50%;
  transform: translate(-50%, 0%);
`;

export interface TypingControllersProps {
  text: string;
  letters: string[];
}

const TypingControllers: React.SFC<TypingControllersProps> = ({
  text,
}) => {
  return (
    <Wrapper>
      <StyledTypingInput
        text={text}
        render={({ cursor, timeSteps }) => (
          <>
            <Hands text={text} cursor={cursor} />
            <StyledLoadingBar
              green
              easing="linear"
              duration={1}
              progress={Number(((timeSteps / 30) * 100).toFixed(2))}
            />
          </>
        )}
      />
    </Wrapper>
  );
};

export default TypingControllers;
