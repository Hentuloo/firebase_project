import styled from 'styled-components';

export const TextInput = styled.input`
  padding: 5px 8px 5px 10px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray[0]};
  background-color: transparent;
  &:focus {
    outline: none;
  }
`;
