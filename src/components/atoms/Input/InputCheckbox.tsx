import React, { FC, useState, useCallback } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  box-shadow: 0px 0px 15px ${({ theme }) => theme.color.shadow[0]};
  color: ${({ theme }) => theme.color.brand[2]};
  justify-items: center;
  align-items: center;
  font-weight: ${({ theme }) => theme.fw[1]};
  font-size: ${({ theme }) => theme.fs.m};
  cursor: pointer;
`;
const Input = styled.input``;

export interface InputCheckboxProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange'> {
  checked: boolean;
  onChange: (newV: boolean) => void;
  inputProps?: Omit<
    React.ComponentPropsWithoutRef<'input'>,
    'onChange' | 'checked' | 'type'
  >;
}

export const InputCheckbox: FC<InputCheckboxProps> = ({
  checked,
  onChange,
  inputProps,
  ...props
}) => {
  const [isChecked, setChecked] = useState(checked);

  const handleChange = useCallback(() => {
    const newValue = !isChecked;
    setChecked(newValue);
    onChange(newValue);
  }, [isChecked, onChange]);

  return (
    <Wrapper {...props}>
      <Input
        className="sr-only"
        type="checkbox"
        onChange={handleChange}
        checked={isChecked}
        {...inputProps}
      />
      <span className={`fa fa-${isChecked ? 'times' : 'check'}`} />
    </Wrapper>
  );
};
