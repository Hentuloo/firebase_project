import React, { FC } from 'react';
import styled from 'styled-components';
import { ScoresTable } from 'components/organisms/Table/ScoresTable';
import { useSelector } from 'react-redux';
import { getFinalResultsWithUserImages } from 'store/selectors/gameSettings.selector';

const Wrapper = styled.div`
  height: 100%;
  display: grid;
  align-items: center;
`;
const StyledScoresTable = styled(ScoresTable)`
  margin: 0px auto;
`;

export interface TableProps {}

export const Table: FC<TableProps> = ({ ...props }) => {
  const results = useSelector(getFinalResultsWithUserImages);

  if (!results) return null;
  return (
    <Wrapper {...props}>
      <StyledScoresTable
        data={results.map((score, index) => ({
          place: index + 1,
          ...score,
        }))}
      />
    </Wrapper>
  );
};
