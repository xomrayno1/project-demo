import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import _ from 'lodash';
import { useTable } from 'react-table'
import { useSelector } from 'react-redux'

import studentApi from '../../api/studentApi';
import TableStudent from './TableStudent';
import FormDialogStuden from './FormDialogStudent'
import { setStudent,setFormStudent } from '../../action/action'
import store from '../../reducer/index'

import './styles/style.css';
StudentList.propTypes = {

};

function StudentList(props) {
 
    console.log("studentList render.....")
    
    const students = useSelector( state => state.studentReducer.students);
    const formDialog = useSelector( state => state.formStudent);

  
    const fetch = async () => {
        try {
            const response = await studentApi.getAll({ limit: 10, page: 1 });
            const data = _.cloneDeep(_.get(response, 'data', []));
           store.dispatch(setStudent(data));
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        console.log("userEffect");
        fetch();
    }, [])


    function handleEditForm(formValue) {
        store.dispatch(setFormStudent({ forms : {...formValue}, visible: true }))
    }

    function handleSaveStudent(forms) {
        if (forms['id']) {
            studentApi.update(forms);
        } else {
            studentApi.create(forms);
        }
        fetch();
    }
    function handleVisibleOnClick(value) {
        store.dispatch(setFormStudent({ ...formDialog, visible: value }))
    }
    function handleButtonAdd(value) {
        store.dispatch(setFormStudent({
            form: {
                id: '',
                name: '',
                code: '',
                email: '',
                address: ''
            },
            visible: value })
        )
     
    }
    function handleDeleteItem(id){
        studentApi.deleteByid(id);
        fetch();
    }
    console.log("student render ...ends")
    return (
        <div className="container">
            <h1>Student List</h1>
            <Button color="success" onClick={() => handleButtonAdd(true)}
                outline style={{ marginBottom: '10px' }} > Add</Button>
            <FormDialogStuden 
                handleSaveStudent={handleSaveStudent}
                handleVisibleOnClick={handleVisibleOnClick}
                visible={formDialog.visible}
                 
            />
            <TableStudent data={students}
                className="student-list"
                handleEditForm={handleEditForm}
                handleDeleteItem={handleDeleteItem}
                />
        </div>
    );
}

export default StudentList;