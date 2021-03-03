import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap'
import {useTable, useSortBy} from 'react-table'


TableCourse.propTypes = {
    
};

function TableCourse(props) {
    const { data, columns} = props;
    const {
        getTableProps,
        getTableBodyProps,
        rows,
        prepareRow,
        headerGroups
    } = useTable({
        columns,
        data
    },useSortBy)
   
    return (
        <div>
            <Table  {...getTableProps()}>
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
                                        <spam>
                                            {
                                                header.isSorted ?  header.isSortedDesc ? ' 🔽' : ' 🔼' : ''
                                            }
                                        </spam>
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
                                <tr key={row.id} {...row.getRowProps()}>
                                    {
                                        row.cells.map( cell => (
                                            <td {...cell.getCellProps()}>
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

export default TableCourse;