import React, { useMemo } from 'react';
import { useTable, useSortBy, useFilters, useGroupBy } from 'react-table';
import { Plot } from './Plot';

const DataTable = ({ data }) => {

    
  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Side',
        accessor: 'side',
        Filter: ({ column }) => <SelectColumnFilter column={column} data={data} />,
      },
      {
        Header: 'Relation',
        accessor: 'relation',
        Filter: ({ column }) => <SelectColumnFilter column={column} data={data} />,
      },
      {
        Header: 'Remarks',
        accessor: 'remarks',
      },
      {
        Header: 'Amount',
        accessor: 'amount',
        Filter: ({ column }) => <FilterWrapper column={column} />,
      },
    ],
    [data]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    { columns, data },
    useFilters,
    useGroupBy,
    useSortBy
  );

  return (
    <div>
      <table {...getTableProps()} style={{ width: '100%' }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <div onClick={(e) => {e.stopPropagation()}}>{column.canFilter ? <FilterWrapper column={column} /> : null}</div>

                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const FilterWrapper = ({ column }) => {
  if (column.id === 'amount') {
    // Numeric filter for the "Amount" column
    return (
      <></>
    );
  }

  // Default filter (for non-numeric columns)
  return (
    <input
      value={column.filterValue || ''}
      onChange={(e) => column.setFilter(e.target.value)}
      placeholder={`Filter ${column.Header.toLowerCase()}`}
    />
  );
};

const SelectColumnFilter = ({ column, data }) => {
  const { filterValue, setFilter } = column;
  const options = React.useMemo(() => {
    const uniqueOptions = new Set(data.map((d) => d[column.id]));
    return ['All', ...uniqueOptions];
  }, [column, data]);

  return (
    <select
      value={filterValue || 'All'}
      onChange={(e) => setFilter(e.target.value === 'All' ? undefined : e.target.value)}
    >
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default DataTable;
