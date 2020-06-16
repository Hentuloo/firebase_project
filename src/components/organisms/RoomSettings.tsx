import React, { FC } from 'react';
import styled from 'styled-components';
import {
  Input,
  InputNumber,
  FilledButton,
  BarDecorator,
} from 'components/atoms';
import { stickyModal } from 'components/molecules';
import { useFormik } from 'formik';
import { InputCheckbox } from 'components/atoms/Input/InputCheckbox';
import {
  validateRoomName,
  validateRoomPlayersLength,
  validateRoomPasword,
} from 'utils/validations';
import { toast } from 'react-toastify';
import Spiner from 'components/atoms/Spiner';

const Wrapper = styled.div`
  ${stickyModal};
  display: grid;
  width: 80%;
  margin: 0px auto;
  max-width: 440px;
  justify-items: center;
  grid-row-gap: 15px;
  padding: 40px 0px;
  ${({ theme }) => theme.mediaQuery.md} {
    transform: translate(0%, -100px);
  }
`;
const Title = styled.h3`
  ${BarDecorator}
  font-weight:${({ theme }) => theme.fw[1]};
`;
const Label = styled.label`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 25px;
  align-items: center;
`;
const StyledFilledButton = styled(FilledButton)`
  padding: 10px 20px;
`;

export interface RoomSetingsState {
  title: string;
  players: number;
  withPassword: boolean;
  password: string;
}
export interface RoomSetingsProps {
  onSubmit: (state: RoomSetingsState) => void;
  isFetching: boolean;
}

export const RoomSetings: FC<RoomSetingsProps> = ({
  onSubmit,
  isFetching,
  ...props
}) => {
  const {
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik<RoomSetingsState>({
    initialValues: {
      title: '',
      players: 2,
      withPassword: false,
      password: '',
    },
    onSubmit: state => {
      let errorFlag = false;
      const { title, players, withPassword, password } = state;

      const titleError = validateRoomName(title);
      if (titleError) {
        errorFlag = true;
        toast(titleError, { type: 'error' });
      }

      const playersLengthError = validateRoomPlayersLength(players, {
        min: 2,
        max: 4,
      });
      if (playersLengthError) {
        errorFlag = true;
        toast(playersLengthError, { type: 'error' });
      }

      if (withPassword) {
        const passwordError = validateRoomPasword(password);
        if (passwordError) {
          errorFlag = true;
          toast(passwordError, { type: 'error' });
        }
      }
      if (!errorFlag) {
        onSubmit(state);
      }
    },
  });

  return (
    <Wrapper {...props}>
      <Title>Tworzenie pokoju</Title>
      <Label>
        <span className="sr-only">Nazwa pokoju:</span>
        <Input
          name="title"
          type="text"
          placeholder="Wpisz nazwę.."
          value={values.title}
          onChange={handleChange}
        />
      </Label>
      <Label>
        Ilość graczy:
        <InputNumber
          value={values.players - 2}
          min={2}
          max={4}
          onChange={newNumber => setFieldValue('players', newNumber)}
        />
      </Label>
      <Label>
        Wymagane hasło:
        <InputCheckbox
          title="Wymagane hasło?"
          checked={!values.withPassword}
          onChange={checked =>
            setFieldValue('withPassword', !checked)
          }
        />
      </Label>
      {values.withPassword && (
        <Label>
          <span className="sr-only">Nazwa pokoju:</span>
          <Input
            name="password"
            type="password"
            placeholder="Wpisz hasło.."
            value={values.password}
            onChange={handleChange}
          />
        </Label>
      )}
      <StyledFilledButton
        onClick={handleSubmit}
        disabled={isFetching}
      >
        Stwórz pokój
      </StyledFilledButton>
      {isFetching && <Spiner />}
    </Wrapper>
  );
};
