import React,{useEffect, useRef, useState} from 'react';
import { useFormik, Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Dialog from 'rc-dialog';
import {Button} from 'reactstrap'
import PropTypes from 'prop-types';

import { addCourse, updateCourse } from '../../redux/action/courseAction'
import { useDispatch } from 'react-redux';

CourseModal.propTypes = {
    item : PropTypes.object,
    visible : PropTypes.bool,
    onCloseDialog : PropTypes.func
};
CourseModal.defaultProps= {
    item : '',
    visible : false,
    onCloseDialog: null
}

function CourseModal({item, visible, onCloseDialog}) {

    const dispatch = useDispatch();

    const yupSchema = Yup.object({
        name: Yup.string().required("Field is required"),
        code: Yup.string().required("Field is required"),
        description: Yup.string().required("Field is required"),
    })
    const formCourseRef = useRef();
    useEffect(()=>{
        formCourseRef.current && formCourseRef.current.setValues({
            ...item
        })
    },[item]);
     
    function onClose(){
        onCloseDialog()
        formCourseRef.current.resetForm({
            // values: {
            //     id : '',
            //     name : '',
            //     code : '',
            //     description: 
            // }
        });
    }
 
    function submitFormDialog(data) {
        console.log("on submitForm")
        // push to database
        console.log(data);
        if (data.id) {
            dispatch(updateCourse(data, formCourseRef, onCloseDialog));
        } else {
            dispatch(addCourse(data, formCourseRef, onCloseDialog))
        }
 
    }
 
 
    return (
        <Dialog
            key={1}
            style={{ width: 600 }}
            title={<div style={{
                fontFamily: '-moz-initial',
                fontSize: '20px',
                textAlign: 'center'
            }}>Save</div>}
            onClose={onClose}
            visible={visible}
            animation="slide-fade"
        >
            <Formik
                initialValues={{
                    id:  item &&  item.id || '',
                    code:  item && item.code || '',
                    name:  item && item.name || '',
                    description:  item && item.description || ''
                }}
                validationSchema={yupSchema}
                onSubmit={submitFormDialog}
                validateOnBlur={false}
                validateOnChange={false}
                innerRef={formCourseRef}
            >
                <Form
                    key={1}
                >
                    <div>
                        <label htmlFor="name">Name : </label>
                        <Field name="name" className="form-control" />
                        <ErrorMessage name="name" className="error-message" component="div" />
                    </div>
                    <div>
                        <label htmlFor="code">Code : </label>
                        <Field name="code" className="form-control" />
                        <ErrorMessage name="code" className="error-message" component="div" />
                    </div>
                    <div>
                        <label htmlFor="description">Description : </label>
                        <Field name="description" as="textarea" className="form-control" />
                        <ErrorMessage name="description" className="error-message" component="div" />
                    </div>
                    <div className="footer-dialog">
                        <Button key="1" color="success" type="submit">Save</Button>,
                        <Button key="2" color="danger" onClick={onClose} >Close</Button>
                    </div>
                </Form>
            </Formik>
        </Dialog>
    );
}

export default CourseModal;