import styled, { css } from 'styled-components';

const withBorder = css`
  max-width: 100%;
  padding: 10px 8px 10px 14px;
  border: 2px solid ${({ theme }) => theme.color.brand[1]};
  border-radius: 32px;
  font-size: ${({ theme }) => theme.fs.s};
  font-weight: 300;
  background-color: transparent;
  &:focus {
    outline: none;
  }
`;

export const Input = styled.input`
  ${withBorder}
  color: ${({ theme }) => theme.color.black[0]};
  &::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: inherit;
    opacity: 1; /* Firefox */
  }

  &:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: inherit;
  }

  &::-ms-input-placeholder {
    /* Microsoft Edge */
    color: inherit;
  }
`;
export const TextInput = styled.input`
  padding: 5px 8px 5px 10px;
  border: none;
  color: ${({ theme }) => theme.color.black[0]};
  border-bottom: 1px solid ${({ theme }) => theme.color.gray[0]};
  background-color: transparent;
  &:focus {
    outline: none;
  }
`;
