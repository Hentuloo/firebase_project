import React, { FC } from 'react';
import styled from 'styled-components';
import {
  BarDecorator,
  Input,
  FilledButton,
  CircleButton,
} from 'components/atoms';
import { useFormik } from 'formik';
import exitDoor from 'assets/svg/icons/exitDoor.svg';
import { Constants } from 'config/Constants';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  display: grid;
  grid-row-gap: 20px;
  text-align: center;
  justify-items: center;
`;
const RoomTitle = styled.span`
  ${BarDecorator}
  font-weight:${({ theme }) => theme.fw[1]};
  display: block;
  margin: 0px auto;
`;
const CloseDoorImage = styled.img``;
const StyledFilledButton = styled(FilledButton)`
  min-width: 150px;
  text-transform: uppercase;
  font-weight: ${({ theme }) => theme.fw[1]} !important;
`;
const StyledCircledButton = styled(CircleButton)`
  display: grid;
  justify-items: center;
  align-items: center;
`;
const ButtonsWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 15px;
`;

export interface JoinWithPasswordForm {
  password: string;
}
export interface JoinRoomWithPasswordProps {
  roomTitle: string;
  submit: (values: JoinWithPasswordForm) => void;
}

export const JoinRoomWithPassword: FC<JoinRoomWithPasswordProps> = ({
  roomTitle,
  submit,
  ...props
}) => {
  const { values, handleSubmit, handleChange } = useFormik<
    JoinWithPasswordForm
  >({
    initialValues: {
      password: '',
    },
    onSubmit: submit,
  });

  return (
    <Wrapper {...props}>
      <RoomTitle>{roomTitle}</RoomTitle>
      <Input
        name="password"
        value={values.password}
        onChange={handleChange}
        placeholder="Wprowadź hasło..."
        type="password"
      />
      <ButtonsWrapper>
        <StyledFilledButton onClick={handleSubmit}>
          Dołącz
        </StyledFilledButton>
        <StyledCircledButton
          as={Link}
          to={Constants.paths.dashboard.path}
        >
          <CloseDoorImage src={exitDoor} alt="Menu główne" />
        </StyledCircledButton>
      </ButtonsWrapper>
    </Wrapper>
  );
};
