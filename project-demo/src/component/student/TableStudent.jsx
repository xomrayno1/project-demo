import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSortBy, useTable } from 'react-table'
import studentApi from '../../api/studentApi';
import { Table,Button } from 'reactstrap';
import Dialog from 'rc-dialog';
import 'bootstrap/dist/css/bootstrap.css';
import 'rc-dialog/assets/bootstrap.css';
import { useSelector } from 'react-redux'

import { setStudent,setFormStudent } from '../../action/action'
import store from '../../reducer/index'


TableStudent.propTypes = {
 
};
TableStudent.defaultProps = {
 
}

function TableStudent(props) {
    const {data,handleDeleteItem} = props;
    console.log("table render....")
    const [dialogDelete , setDialogDelete] = useState({
        visible:  false,
        id : 0
    })
  

    const [columns,setColumns] = useState(()=>{
        return  [
            {
                Header : 'Id',
                accessor: 'id'
            },{
                Header : 'Name',
                accessor: 'name'
            },{
                Header : 'Code',
                accessor: 'code'
            }
            ,{
                Header : 'Email',
                accessor: 'email'
            }
            ,{
                Header : 'Address',
                accessor: 'address'
            },{
                Header : ' + ',
                Cell: (value) => ([
                    <Button color="warning" onClick={()=>
                        handleButtonEdit(value.row)}>Edit</Button>,
                    <Button color="danger" onClick={()=>
                        deleteButton(value.row)}>Delete</Button>
                ])
            }
        ]
    })

    function handleButtonEdit(value){
        const fetch =  async () => {
            const { id } = value.values;
            const data = await studentApi.getById(id);
            store.dispatch(setFormStudent({form : {
                ...data
            } ,visible: true}));
        }
        fetch();
    }
    function deleteButton(value){
        const { id } = value.values;
        setDialogDelete({...dialogDelete,visible : true , id : id})
    }
    function onClose(){
        setDialogDelete({...dialogDelete,visible : false , id : 0})
    }
    function onOkDelete(){
        handleDeleteItem(dialogDelete.id);
        setDialogDelete({...dialogDelete,visible : false , id : 0})
    }
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
            <Dialog
                style={{ width: 600, height : 1000 }}
                title={<div>Save</div>}
                onClose={onClose}
                visible={dialogDelete.visible}
                animation="slide-fade"
                footer={[
                    <Button key="1" color="success" onClick={onOkDelete} >Ok</Button>,
                    <Button key="2" color="danger"  onClick={onClose} >Close</Button>
                ]}
                >
                    Bạn có chắc chắn muốn xóa ?
                </Dialog>
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