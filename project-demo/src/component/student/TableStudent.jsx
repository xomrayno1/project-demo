import React, { useEffect, useState } from 'react';
import { Table,Space, Popconfirm, Form,Tag } from 'antd';
import {useDispatch,useSelector} from 'react-redux'
import EditableCell from './EditableCell'
import { Button } from "reactstrap";
import PropTypes from 'prop-types';

import {defaultFilter} from '../../common/utils';
import {fetchStudentRequest} from '../../redux/action/studentAction'
import {ADD_EVENT} from '../../common/Constant'

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
  const {totalRows,limit,page} = pagination ;
  const [editingKey, setEditingKey] = useState('');
  const dispatch = useDispatch();
  
  
  const {isAdd} = useSelector(state => state.app)

  const isEditing = (record) => record.id === editingKey;

  const {error,isLoading} = useSelector(state=> state.student)

  // useEffect(()=>{
  //   dispatch(fetchStudentRequest({...defaultFilter}));
  // },[error])

  if(isAdd && editingKey === ''){
    form.setFieldsValue({
      id:'',
      name: '',
      code: '',
      address: '',
      email: ''
    })
  }
  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.id);
    dispatch({type: ADD_EVENT, payload: true})
  };

  
  const cancel = () => {
    setEditingKey('');
    dispatch(fetchStudentRequest(defaultFilter));
    dispatch({type: ADD_EVENT, payload: false})
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
    dispatch({type: ADD_EVENT, payload: false})
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
    }, {
        title : 'Courses',
        dataIndex : 'courses',
        render : courses => {
            return courses != null ? (
               <>
                  {
                    courses.map(item => (
                        <Tag color="red" key={item}>
                            {
                              item
                            }
                        </Tag>
                      )
                    ) 
                  }
               </>
            )  : null
        }
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
                    <Button style={{
                        fontFamily : '-moz-initial',
                        padding : '6px 20px 6px 20px'
                    }} color="primary">Enrol</Button>
                    <Popconfirm title="Sure to delete ?" onConfirm={() => handleDeleteEmp(record.id) }>
                        <Button key={record.id} color="danger" style={{
                        fontFamily : '-moz-initial',
                        padding : '6px 20px 6px 20px'
                    }}>Delete</Button>
                    </Popconfirm>
                    <Button color="warning" disabled={editingKey !== '' || isAdd } 
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