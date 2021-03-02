import React from 'react';
import PropTypes from 'prop-types';
 
import { useTable, useSortBy } from 'react-table'
import { Table } from 'reactstrap'

StudentList.propTypes = {
    
};
 
function StudentList(props) {
    const {data, columns} = props;
    const { getTableProps , getTableBodyProps, headerGroups,
        rows,prepareRow } = useTable({
            columns,
            data
        },useSortBy)
        // Render the UI for your table
    return (
        <div>
             <h1>ReactTable</h1>
            <Table dark {...getTableProps()}>
                <thead>
                    {
                        headerGroups.map(headerGroup => {
                           return  <tr {...headerGroup.getHeaderGroupProps()}>
                              {headerGroup.headers.map(column => {
                                    return  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                      {column.render('Header')}
                                      <span>
                                            {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : ''}
                                        </span>
                                    </th> 
                              })}  
                            </tr>
                        })
                    }
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        rows.map((row,i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {
                                        row.cells.map(cell => {
                                            return <td {...cell.getCellProps}>{cell.render('Cell')}</td>
                                        })
                                    }
                                </tr>
                            )
                        })
                    }

                </tbody>
            </Table> 
            <div>Showing the first 20 results of {rows.length} rows</div> 
        </div>
    );
}

export default StudentList;