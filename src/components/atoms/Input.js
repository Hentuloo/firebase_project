import styled from 'styled-components';

export const Input = styled.input`
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
export const TextInput = styled.input`
  padding: 5px 8px 5px 10px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray[0]};
  background-color: transparent;
  &:focus {
    outline: none;
  }
`;
