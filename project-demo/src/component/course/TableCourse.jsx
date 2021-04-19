import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { defaultFilter } from '../../common/utils'
import { Button } from 'reactstrap'

import Dialog from 'rc-dialog';
import 'bootstrap/dist/css/bootstrap.css';
import 'rc-dialog/assets/bootstrap.css';
import { Table, Space, Tag } from 'antd';
import CourseModal from './CourseModal';

TableCourse.propsTypes = {
    pagination: PropTypes.object,
    handleDeleteItem: PropTypes.func
}
TableCourse.defaultProps = {
    pagination: {
        ...defaultFilter
    },
    handleDeleteItem: null
}

function TableCourse({ data, pagination, handlePagination, handleDeleteItem }) {
    const { totalRows, limit, page } = pagination;
    
    const [deleteDialog, setDeleteDialog] = useState({
        visible: false,
        id: 0
    })

    const [formDialog, setFormDialog] = useState({
        visible:  false, 
        form : ''
    })
 
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id'
        }, {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: 'Code',
            dataIndex: 'code',
            key: 'code'
        }, {
            title: 'Description',
            dataIndex: 'description',
            key: 'description'
        }, {
            title: 'Students',
            dataIndex: 'students',
            render: students => (
                students.map(item => {
                    return (
                        <Tag color="red" key={item}>
                            {item}
                        </Tag>
                    )
                })
            )
        }, {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => {
                return (<Space>
                    <Button key={record.id} color="danger" style={{
                        fontFamily: '-moz-initial',
                        padding: '6px 20px 6px 20px'
                    }}
                        onClick={() => onDelete(record)}
                    >Delete</Button>
                    <Button color="warning"
                        key={record.id}
                        style={{
                            fontFamily: '-moz-initial',
                            padding: '6px 20px 6px 20px'
                        }}
                        onClick={() => handleEditOnClick(record)} // record
                    >
                        Edit
                        </Button>
                </Space>
                )
            }
        }
    ]
    function handleEditOnClick(form) {
        console.log(form)
        setFormDialog({
            visible : true, 
            form
        })
    }
    function onCloseDialog() {
        setDeleteDialog({
            ...deleteDialog,
            visible: false,
        })
    }
    function onDelete({ id }) {
        setDeleteDialog({
            visible: true,
            id: id
        })
    }
    function onSaveDelete() {
        if (!handleDeleteItem) { return }
        const { id } = deleteDialog;
        handleDeleteItem(id);
        setDeleteDialog({
            visible: false,
            id: 0
        })
    }
    return (
        <div>
            <Table
                dataSource={data}
                bordered={true}
                columns={columns}
                pagination={{
                    total: totalRows,
                    pageSize: limit,
                    current: page,
                    onChange: handlePagination
                }}
                className="table table-bordered border-primary"
                size="middle"
            />

            <CourseModal  
                visible={formDialog.visible}
                item={formDialog.form}
                onCloseDialog={() => setFormDialog({...formDialog, visible: false})}  
            />

 
            {/* dialog delete */}
            <Dialog
                style={{ width: 600 }}
                title={<div style={{
                    fontFamily: '-moz-initial',
                    fontSize: '20px',
                    textAlign: 'center'
                }}>Delete</div>}
                onClose={onCloseDialog}
                visible={deleteDialog.visible}
                animation="slide-fade"
                footer={[
                    <Button key="1" color="success" type="submit"
                        onClick={onSaveDelete}
                    >Ok</Button>,
                    <Button key="2" color="danger" form="submitForm"
                        onClick={onCloseDialog}>Close</Button>

                ]}
            >
                <p style={{
                    textAlign: 'center',
                    fontSize: 18
                }}> Are you sure delete</p>
            </Dialog>
        </div>
    );
}

export default TableCourse;