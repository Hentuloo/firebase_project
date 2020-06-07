import React, { FC } from 'react';
import styled from 'styled-components';
import { BarDecorator, Input, FilledButton } from 'components/atoms';
import { useFormik } from 'formik';

const Wrapper = styled.div`
  display: grid;
  grid-row-gap: 15px;
  text-align: center;
`;
const RoomTitle = styled.span`
  ${BarDecorator}
  font-weight:${({ theme }) => theme.fw[1]};
  display: block;
  margin: 0px auto;
`;
const StyledButton = styled(FilledButton)`
  min-width: 150px;
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
      <StyledButton onClick={handleSubmit}>Dołącz</StyledButton>
    </Wrapper>
  );
};
