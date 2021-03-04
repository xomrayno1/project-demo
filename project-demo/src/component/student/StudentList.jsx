import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import _ from 'lodash';
import { useTable } from 'react-table'

import studentApi from '../../api/studentApi';
import TableStudent from './TableStudent';
import FormDialogStuden from './FormDialogStudent'


import './styles/style.css';
StudentList.propTypes = {

};

function StudentList(props) {
    const [students, setStudents] = useState([]);

    const [action, setAction] = useState(1);

    const [formDialog, setFormDialog] = useState(() => {
        return {
            visible: false,
            form: {
                id: '',
                name: '',
                code: '',
                email: '',
                address: ''
            }
        }
    });
    const fetch = async () => {
        try {
            const response = await studentApi.getAll({ limit: 10, page: 1 });
            const data = _.cloneDeep(_.get(response, 'data', []));
            setStudents(data);
            console.log("abc", data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        console.log("userEffect");
        fetch();
    }, [])


    function handleEditForm(formValue) {
        console.log({ visible: true, form: { ...formValue } })
        setFormDialog({ visible: true, form: { ...formValue } })
    }

    function handleSaveStudent(forms) {
        if (forms['id']) {
            studentApi.update(forms);
        } else {
            studentApi.create(forms);
        }
        fetch();
        fetch();
    }
    function handleVisibleOnClick(value) {
        setFormDialog({ ...formDialog, visible: value })
    }
    function handleButtonAdd(value) {
        setFormDialog({
            form: {
                id: '',
                name: '',
                code: '',
                email: '',
                address: ''
            },
            visible: value
        }
        )
    }
    function handleDeleteItem(id){
        studentApi.deleteByid(id);
        fetch();
        fetch();
    }

    return (
        <div className="container">
            <h1>Student List</h1>
            <Button color="success" onClick={() => handleButtonAdd(true)}
                outline style={{ marginBottom: '10px' }} > Add</Button>
            <FormDialogStuden 
                handleSaveStudent={handleSaveStudent}
                handleVisibleOnClick={handleVisibleOnClick}
                visible={formDialog.visible}
                formDialog={formDialog}
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