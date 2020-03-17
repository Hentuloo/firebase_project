import styled from 'styled-components';

export const GroupWrapper = styled.div`
  position: relative;
  display: grid;
  width: 90%;
  margin: 30px auto;
  grid-row-gap: 25px;
  ${({ theme }) => theme.mediaQuery.md} {
    grid-auto-flow: column;
    grid-template-columns: repeat(3, minmax(17%, 190px));
    grid-template-rows: 250px;
    justify-content: space-evenly;
  }
  &::before {
    display: none;
    position: absolute;
    content: '';
    width: 90%;
    height: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -95%);
    background-color: ${({ theme }) => theme.color.white[0]};
    border-radius: 45px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    z-index: -1;
    ${({ theme }) => theme.mediaQuery.md} {
      display: block;
    }
  }
`;

export const GroupItem = styled.div`
  position: relative;
  display: grid;
  height: 100px;
  grid-template-columns: 100px 1fr;
  grid-template-rows: auto 1fr;
  grid-column-gap: 30px;
  ${({ theme }) => theme.mediaQuery.md} {
    height: auto;
    grid-template-columns: 1fr;
    grid-template-rows: 100px 30px auto auto;
    padding: 17px 0px;
  }

  &::after {
    display: none;
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 3px solid ${({ theme }) => theme.color.brand[1]};
    padding: 20px 0px 20px;
    box-sizing: content-box;
    border-radius: 45px;
    ${({ theme }) => theme.mediaQuery.md} {
      display: block;
    }
  }
`;
export const GroupImageWrapper = styled.div`
  grid-column: 1 / span 1;
  grid-row: 1/-1;
  text-align: center;
  ${({ theme }) => theme.mediaQuery.md} {
    grid-row: 1 / span 1;
  }
`;
export const GroupImage = styled.img`
  position: relative;
  max-width: 100%;
  max-height: 100%;
  ${({ theme }) => theme.mediaQuery.md} {
    grid-row: 1 / span 1;
    margin: 0px auto;
  }
`;

export const GroupTitle = styled.h4`
  position: relative;
  grid-column: 2 / span 1;
  ${({ theme }) => theme.mediaQuery.md} {
    grid-column: 1 / span 1;
    grid-row: 3 / span 1;
  }
`;

export const GroupDescription = styled.p`
  grid-column: 2 / span 1;
  display: grid;
  grid-auto-flow: column;
  justify-content: center;
  align-items: end;
  ${({ theme }) => theme.mediaQuery.md} {
    grid-column: 1 / span 1;
    grid-row: 4 / span 1;
  }
`;
