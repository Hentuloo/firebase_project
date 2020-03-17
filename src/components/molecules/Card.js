import styled from 'styled-components';

export const Card = styled.div`
  position: relative;
  &::before {
    position: absolute;
    content: '';
    width: 70%;
    height: 100%;
    top: 50%;
    left: 50%;
    padding: 30px 0px;
    transform: translate(-50%, -50%);
    border-radius: 45px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    background-color: ${({ theme }) => theme.color.white[0]};
    z-index: -1;
  }
`;
