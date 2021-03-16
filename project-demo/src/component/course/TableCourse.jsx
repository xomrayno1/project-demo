import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap'
import {useTable, useSortBy} from 'react-table'

import {Button} from 'reactstrap'
import courseApi from '../../api/courseApi';
import Dialog from 'rc-dialog';
import 'bootstrap/dist/css/bootstrap.css';
import 'rc-dialog/assets/bootstrap.css';

import {setCourse,setFormCourse} from '../../action/action'
import store from '../../reducer/index'

 
function TableCourse(props) {
    console.log("table render ...")
    const { data ,handleDeleteItem} = props;
    const [dialogDelete , setDialogDelete] = useState({
        visible:  false,
        id : 0
    })
    const [columns, setColumns] = useState(()=>{
        return [
            {
                Header : 'Id',
                accessor: 'id'
            },{
                Header : 'Name',
                accessor: 'name'
            },{
                Header : 'Code',
                accessor: 'code'
            },{
                Header : 'Description',
                accessor: 'description'
            },{
                Header :  ' + ',
                Cell : (value) => (
                    [ <Button color="warning" key={1} 
                            onClick={() => handleButtonEdit(value.row)}>Edit</Button>,
                        <Button color="danger" key={2} 
                            onClick={() => deleteButton(value.row)} >Delete</Button>]
                )
            }
        ]
    })
    function handleButtonEdit(value){
        const fetch =  async () => {
            const { id } = value.values;
            const data = await courseApi.getById(id);
            // if(!handleEditForm){return}
            // handleEditForm({...data})
            store.dispatch(setFormCourse({form: data, visible: true }))
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
        rows,
        prepareRow,
        headerGroups
    } = useTable({
        columns,
        data
    },useSortBy)
   
    return (
        <div>
            <Dialog
                style={{ width: 600 }}
                title={<div>Delete</div>}
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