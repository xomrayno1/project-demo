import React, { useState } from 'react';
import {Table,Space } from 'antd'
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'bootstrap';


function TableStudent({data,pagination,handlePagination}) {
    const {totalRows,limit} = pagination;

    const columns = [
        {
            title: 'Id',
            dataIndex : 'id',
            key : 'id'
        },{
            title: 'Name',
            dataIndex : 'name',
            key : 'name'
        },{
            title: 'Code',
            dataIndex : 'code',
            key : 'code'
        },{
            title: 'Email',
            dataIndex : 'email',
            key : 'email'
        },{
            title: 'Address',
            dataIndex : 'address',
            key : 'address'
        },{
            title : 'Action',
            dataIndex: 'action',
            render : () => {
                <Space>
                    <Button color="danger">Delete</Button>
                    <Button color="warning">Edit</Button>
                </Space>
            }
        }
    ]
 
    return (
        <>
         
            <Table  columns={columns}  
            dataSource={data}
            pagination={{
                pageSize : limit,
                total: totalRows + 10,
                onChange :  handlePagination,
                
            }}
            />
            
        </>
    )
}

export default TableStudent;