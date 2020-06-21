import React, { FC } from 'react';
import { Column, useTable } from 'react-table';
import styled from 'styled-components';

const Wrapper = styled.table`
  ${({ theme }) => theme.mediaQuery.md} {
    border-spacing: 2em;
  }
`;
const TableD = styled.td`
  vertical-align: bottom;

  &.place__cell {
    font-size: ${({ theme }) => theme.fs.large};
    font-weight: ${({ theme }) => theme.fw[1]};
    color: ${({ theme }) => theme.color.brand[3]};
    line-height: 75%;
    vertical-align: bottom;
  }
`;
const TableR = styled.tr``;
const TableHead = styled.thead`
  color: ${({ theme }) => theme.color.brand[3]};
  opacity: 0.4;
`;

export interface ScoreTableData {
  place: number;
  displayName: string;
  points: number;
  wpmSpeed: number;
  accuracy: number;
  progress: number;
}

export interface ScoresTableProps {
  data: ScoreTableData[];
}

const columns = [
  {
    Header: 'Place',
    accessor: 'place',
    className: 'place__cell',
  },
  {
    Header: 'Player name',
    accessor: 'displayName',
    className: 'displayName__cell',
  },
  {
    Header: 'Points',
    accessor: 'points',
    className: 'points__cell',
  },
  {
    Header: 'WPM',
    accessor: 'wpmSpeed',
    className: 'wpmSpeed__cell',
  },
  {
    Header: 'Accurancy',
    accessor: 'accuracy',
  },
] as Column<ScoreTableData>[];

export const ScoresTable: FC<ScoresTableProps> = ({
  data,
  ...props
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  return (
    <Wrapper {...props} {...getTableProps()}>
      <TableHead>
        {headerGroups.map(headerGroup => (
          <TableR {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>
                {column.render('Header')}
              </th>
            ))}
          </TableR>
        ))}
      </TableHead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <TableR {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <TableD
                    {...cell.getCellProps({
                      // @ts-ignore
                      className: cell.column.className,
                    })}
                  >
                    {cell.render('Cell')}
                  </TableD>
                );
              })}
            </TableR>
          );
        })}
      </tbody>
    </Wrapper>
  );
};
