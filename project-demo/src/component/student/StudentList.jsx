import React, { useEffect, useState,useContext } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import _ from 'lodash';
import { useTable } from 'react-table'
import { useSelector } from 'react-redux'
 

import UserContext from '../../common/UseContext'
import studentApi from '../../api/studentApi';
import TableStudent from './TableStudent';
import FormDialogStuden from './FormDialogStudent'
import { setStudent,setFormStudent } from '../../action/action'
import store from '../../reducer/index'

import './styles/style.css';
StudentList.propTypes = {

};

function StudentList(props) {

    const user = useContext(UserContext);

    console.log(user)

    console.log("studentList render.....")
    
    const students = useSelector( state => state.studentReducer.students);
    const formDialog = useSelector( state => state.formStudent);

    const fetch = async () => {
        try {
            const response = await studentApi.getAll({ limit: 10, page: 1 });
            const data = _.cloneDeep(_.get(response, 'data', []));
            store.dispatch(setStudent(data));
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetch();
    }, [])
    
    async function handleSaveStudent(forms) {
        const save =  async () => {
            if (forms['id']) {
                await  studentApi.update(forms);
            } else {
                await  studentApi.create(forms);
            }
        }
        await save();
        fetch();
    }

    function handleVisibleOnClick(value) {
        store.dispatch(setFormStudent({ ...formDialog, visible: value }))
    }
    function handleButtonAdd() {
        store.dispatch(setFormStudent({
            form: {
                id: '',
                name: '',
                code: '',
                email: '',
                address: ''
            },
            visible: true })
        )
    }
    async function handleDeleteItem(id){
        await studentApi.deleteByid(id);
        fetch();
    }
     
    return (
        <div className="container">
            <h1>Student List</h1>
            <Button color="success" onClick={() => handleButtonAdd()}
                outline style={{ marginBottom: '10px' }} > Add</Button>
            <FormDialogStuden 
                handleSaveStudent={handleSaveStudent}
                handleVisibleOnClick={handleVisibleOnClick}
                visible={formDialog.visible}
                 
            />
            <TableStudent data={students}
                className="student-list"
                handleDeleteItem={handleDeleteItem}
            />
        </div>
    );
}

export default StudentList;