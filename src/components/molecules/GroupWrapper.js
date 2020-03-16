import styled from 'styled-components';

export const GroupWrapper = styled.div`
  display: grid;
  width: 90%;
  margin: 30px auto;
  grid-row-gap: 25px;
`;

export const GroupItem = styled.div`
  display: grid;
  height: 100px;
  grid-template-columns: 100px 1fr;
  grid-template-rows: auto 1fr;
  grid-column-gap: 30px;
`;

export const GroupImage = styled.img`
  grid-column: 1 / span 1;
  grid-row: 1/-1;
  max-width: 100%;
`;

export const GroupTitle = styled.h4`
  grid-column: 2 / span 1;
`;

export const GroupDescription = styled.p`
  grid-column: 2 / span 1;
  display: grid;
  grid-auto-flow: column;
  justify-content: center;
  align-items: end;
`;
