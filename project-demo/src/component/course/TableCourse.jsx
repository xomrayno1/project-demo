import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {defaultFilter} from '../../common/utils'
import {Button} from 'reactstrap'
 
import Dialog from 'rc-dialog';
import 'bootstrap/dist/css/bootstrap.css';
import 'rc-dialog/assets/bootstrap.css';
import {Table,Space,Tag} from 'antd';
 
TableCourse.propsTypes = {
    pagination : PropTypes.object,
    handleEditItem : PropTypes.func
}
TableCourse.defaultProps = {
    pagination : {
        ...defaultFilter
    },
    handleEditItem: null
}
 
function TableCourse({data,pagination,handlePagination,handleEditItem}) {
    const {totalRows, limit, page} = pagination
    const columns = [
        {
            title : 'Id',
            dataIndex : 'id',
            key: 'id'
        },{
            title : 'Name',
            dataIndex : 'name',
            key: 'name',
        },{
            title : 'Code',
            dataIndex: 'code',
            key: 'code'
        },{
            title: 'Description',
            dataIndex : 'description',
            key: 'description'
        },{
            title: 'Students',
            dataIndex : 'students',
            render : students => (
                students.map( item => {
                    return (
                        <Tag color="red" key={item}>
                            {item}
                        </Tag>
                    )
                })
            )
        },{
            title : 'Action',
            dataIndex : 'action',
            render : (_,record) => {
                return (    <Space>
                        {/* <Button style={{
                            fontFamily : '-moz-initial',
                            padding : '6px 20px 6px 20px'
                        }} color="primary">Add Student</Button> */}
                        <Button key={record.id} color="danger" style={{
                            fontFamily : '-moz-initial',
                            padding : '6px 20px 6px 20px'
                        }}>Delete</Button>
                        <Button color="warning"  
                                key={record.id} 
                                style={{
                                fontFamily : '-moz-initial',
                                padding : '6px 20px 6px 20px'
                            }}
                            onClick={()=>handleEditOnClick(record)}
                        >
                                Edit
                        </Button>
                    </Space>
                )
            }
        }
    ]
    function handleEditOnClick(form){
        if(!handleEditItem){return}
        handleEditItem({
            visible : true,
            form : form
        });
    }
    return (
        <div>
            <Table
                dataSource={data}
                bordered={true}
                columns={columns}
                pagination = {{
                    total : totalRows,
                    pageSize : limit,
                    current : page,
                    onChange : handlePagination
                }}
                className="table table-bordered border-primary"
                size="middle"
            />
        </div>
    );
}

export default TableCourse;