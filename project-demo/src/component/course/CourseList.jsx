import React, {useEffect, useState,useContext} from 'react';
 
import { Button } from 'reactstrap'
import {useSelector} from 'react-redux'

import TableCourse from './TableCourse';
import coursesApi from '../../api/courseApi';
import FormDialogCourse from './FormDialogCourse';
import courseApi from '../../api/courseApi';
import {setCourse,setFormCourse} from '../../redux/action/courseAction'
import store from '../../redux/reducer/index'
import UserContext from '../../common/UseContext'
 
 

function CourseList(props) {
     

   

    console.log("course render ...")
     
    const courses = useSelector(state =>
                         state.courseReducer.course);
    const formDialog = useSelector(state =>
                         state.formCourse);
        
    const fetch = async () => {
        const response = await coursesApi.getAll({limit: 10, page: 1});
        const { data } = response;
        store.dispatch(setCourse(data));
    }
    useEffect( () => {
        console.log("userEffect");
        fetch();
    },[])
    async function handleSaveCourse(forms){
        const save = async () => {
            if (forms['id']) {
                await coursesApi.update(forms);
            } else {
                await  coursesApi.create(forms);
            }
        }
        await save();
        fetch();
    }
    function handleVisibleOnClick(value) {
        store.dispatch(setFormCourse({
            ...formDialog, visible: value
        }))
    }
    function handleButtonAdd(value) {
        store.dispatch(setFormCourse({
            form: {
                id: '',
                name: '',
                code: '',
                description: ''
            },
            visible: value
        }))  
    
    }
   
    function handleEditForm(formValue) {
        store.dispatch(setFormCourse({
            visible: true, form: { ...formValue }
        }))  
 
    }
    async function handleDeleteItem(id){
        await courseApi.deleteById(id);
        fetch();
    }
    console.log("course render end...")
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
                formDialog={formDialog.form}
                />
        </div>
    );
}

export default CourseList;