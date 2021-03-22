import React, { useState } from 'react';
import { Table,Space, Popconfirm, Form, Typography,notification } from 'antd';
import {useDispatch,useSelector} from 'react-redux'
import EditableCell from './EditableCell'
import { Button } from "reactstrap";
import PropTypes from 'prop-types';


import {
  addStudent,
  deleteStudent,
  updateStudent
  } from '../../redux/action/studentAction'

TableStudent.propTypes = {
  pagination : PropTypes.object

};
TableStudent.defaultProps = {
  pagination : {
      totalRows: 0,
      limit: 10,
      page : 1
  }
}


function TableStudent({data,pagination,handlePagination}){
  const [form] = Form.useForm();
  const {totalRows,limit,page} = pagination ;// || defaultsPagination;
  const [editingKey, setEditingKey] = useState('');
  const dispatch = useDispatch();
  const isEditing = (record) => record.id === editingKey;

  const {error} = useSelector(state=> state.student)

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.id);
  };

  
  const cancel = () => {
    setEditingKey('');
  };
  function handleDeleteEmp(id){
    dispatch(deleteStudent(id));
  }
  const save = async (record) => {
    const row = await form.validateFields();
    if(record.id){
        row.id = record.id;
        dispatch(updateStudent(row))
    }else{
        dispatch(addStudent(row));
    }
    setEditingKey('');
}

  const columns = [
    {
        title: 'Id',
        dataIndex : 'id',
        key : 'id'
    },{
        title: 'Name',
        dataIndex : 'name',
        key : 'name',
        editable : true
    },{
        title: 'Code',
        dataIndex : 'code',
        key : 'code',
        editable : true
    },{
        title: 'Email',
        dataIndex : 'email',
        key : 'email',
        editable : true
    },{
        title: 'Address',
        dataIndex : 'address',
        key : 'address',
        editable : true
    },{
        title : 'Action',
        dataIndex: 'action',
        render : (_,record) => {
            const editable = isEditing(record);
            return editable ? (
                <span>
                    <a href="#" 
                        style={{
                        marginRight: 8,
                    }}
                     onClick={() => save(record)}
                     >Save</a>
                    <Popconfirm title="Sure to cancel" onConfirm={cancel}>
                        <a href="#">Cancel</a>
                    </Popconfirm>
                </span>
            ) :  (
                <Space>
                    <Popconfirm title="Sure to delete ?" onConfirm={() => handleDeleteEmp(record.id) }>
                        <Button key={record.id} color="danger" style={{
                        fontFamily : '-moz-initial',
                        padding : '6px 20px 6px 20px'
                    }}>Delete</Button>
                    </Popconfirm>
                    <Button color="warning" disabled={editingKey !== '' } 
                            key={record.id} onClick={()=> edit(record)} 
                            style={{
                              fontFamily : '-moz-initial',
                              padding : '6px 20px 6px 20px'
                          }}
                        >
                            Edit
                    </Button>
                </Space>
            )
        }
    }
]
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

 
  return (
    <div>
      <Form  form={form} component={false} validateTrigger={true}>
        <Table
            columns={mergedColumns}  
            dataSource={data}
            pagination={{
                pageSize : limit,
                total: totalRows,
                current : page,
                onChange :  handlePagination,
            }}
            components={{body : {
                cell : EditableCell
            }}}
            bordered ={true}
            className="table table-bordered border-primary"
            size="middle"
        />
      </Form>
    </div>
  );
};

export default TableStudent