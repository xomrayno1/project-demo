import React from 'react';
import PropTypes from 'prop-types';
import { useSortBy, useTable } from 'react-table'
import { Table } from 'reactstrap'
import { Button } from 'bootstrap';

TableStudent.propTypes = {
    
};

function TableStudent(props) {
    const {data, columns} = props;
    
    const { 
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
            } = useTable({
                columns,
                data
            },
            useSortBy)
             
    return (
        <div>
            <Table  className="table table-bordered border-primary" {...getTableProps()}>
                <thead>
                    {
                        headerGroups.map( (headerGroup,idx) => (
                            <tr key={idx} {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map( header => (
                                        <th {...header.getHeaderProps(header.getSortByToggleProps())}>
                                            {
                                                header.render('Header')
                                            }
                                            <span>
                                                {header.isSorted
                                                ? header.isSortedDesc
                                                    ? ' 🔽'
                                                    : ' 🔼'
                                                : ''}
                                            </span>
                                        </th>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        rows.map( (row,idx) => {
                            prepareRow(row);
                            return (
                                <tr key={row.id} {...row.getRowProps}>
                                    {
                                        row.cells.map( cell => (
                                            <td key={cell.id} {...cell.getCellProps()}>
                                                {
                                                    cell.render('Cell')
                                                }
                                            </td>
                                        ))
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    );
}

export default TableStudent;