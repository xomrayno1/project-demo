import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap'
import TableCourse from './TableCourse';
import coursesApi from '../../api/courseApi';
import FormDialogCourse from './FormDialogCourse';
import courseApi from '../../api/courseApi';
CourseList.propTypes = {
    
};

function CourseList(props) {
    const [courses, setCourses] = useState([]);
     
    const [formDialog, setFormDialog] = useState(() => {
        return {
            visible: false,
            form: {
                id: '',
                name: '',
                code: '',
                description: ''
            }
        }
    });
    const fetch = async () => {
        const response = await coursesApi.getAll({limit: 10, page: 1});
        const { data } = response;
        setCourses(data);
    }
    useEffect( () => {
        console.log("userEffect");
        fetch();
    },[])
    function handleSaveCourse(forms){
        if (forms['id']) {
            coursesApi.update(forms);
        } else {
            coursesApi.create(forms);
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
                    description: ''
                },
                visible: value
            }
        )
    }
    function handleVisibleOnClick(value) {
        setFormDialog({ ...formDialog, visible: value })
    }
    function handleEditForm(formValue) {
        console.log({ visible: true, form: { ...formValue } })
        setFormDialog({ visible: true, form: { ...formValue } })
    }
    function handleDeleteItem(id){
        courseApi.deleteById(id);
        fetch();
        fetch();
    }
    return (
        <div className="container">
            <h1>Course List</h1>
            <Button color="success"   outline style={{marginBottom : '10px'}} 
                                onClick={ () => handleButtonAdd(true)}> Add</Button>
            <TableCourse data={courses} 
                handleEditForm={handleEditForm}
                handleDeleteItem={handleDeleteItem}
            />
            <FormDialogCourse
                handleSaveCourse={handleSaveCourse}
                handleVisibleOnClick={handleVisibleOnClick}
                visible={formDialog.visible}
                formDialog={formDialog}
                />
        </div>
    );
}

export default CourseList;