import React, { FC } from 'react';
import styled from 'styled-components';
import { Modal } from 'components/molecules';
import { BarDecorator, FilledButton } from 'components/atoms';

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  padding: 15px 25px;
  grid-row-gap: 10px;
  span {
    color: ${({ theme }) => theme.color.brand[1]};
  }
`;
const Title = styled.h3`
  ${BarDecorator}
  font-size:${({ theme }) => theme.fs.m};
`;
const StyledFilledButton = styled(FilledButton)`
  padding: 8px 20px;
`;

export interface BadAccurancyModalProps {
  close: () => void;
}

export const BadAccurancyModal: FC<BadAccurancyModalProps> = ({
  close,
  ...props
}) => {
  return (
    <Modal {...props} toggleActive={close}>
      <Wrapper>
        <Title>Hola, hola...</Title>
        <p>
          Musisz zwracać uwagę na to jak
          <span> &quot;celnie&quot; </span>piszesz. W takim stanie
          twoje pisanie jest wyłącznie efektowne, po prostu szybko
          uderzasz w klawiaturę tak potrafiłby każdy, ale żeby przejść
          krok dalej szybkie pisanie powinno być równie efektywne i
          skuteczne.
        </p>
        <StyledFilledButton onClick={close} type="button">
          Ok!
        </StyledFilledButton>
      </Wrapper>
    </Modal>
  );
};
