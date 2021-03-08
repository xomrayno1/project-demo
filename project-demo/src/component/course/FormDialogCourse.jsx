import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'rc-dialog';
import { Button,Alert } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'rc-dialog/assets/bootstrap.css';
import {useForm} from 'react-hook-form'

FormDialogCourse.propTypes = {
    handleSaveCourse: PropTypes.func,
    handleVisibleOnClick: PropTypes.func,
    formDialog: PropTypes.object

};
FormDialogCourse.defaultProps = {
    handleSaveCourse: null,
    handleVisibleOnClick: null,
    formDialog: null
}
function FormDialogCourse(props) {
    const { visible, handleVisibleOnClick, handleSaveCourse, formDialog } = props;
    const {register,setValue,handleSubmit,clearErrors,watch,errors} = useForm();
 

    useEffect(() => {
        setValue("code",formDialog["code"]);
        setValue("id",formDialog["id"]);
        setValue("name",formDialog["name"]);
        setValue("description",formDialog["description"]);
    }, [formDialog])


    const onClose = () => {
        if (!handleVisibleOnClick) { return; }
        handleVisibleOnClick(false);
        clearErrors();
    }
    const handleSaveDialog = (data) => {
        data = {...data, id : formDialog['id']}
        if (!handleSaveCourse) { return; }
        handleSaveCourse(data);
        console.log(data)
        onClose();
    }
    

    return (
        <div>
            <Dialog
                style={{ width: 600 }}
                title={<div>Save</div>}
                onClose={onClose}
                onSubmit={handleSubmit(handleSaveDialog)}
                visible={visible}
                animation="slide-fade"
                footer={[
                    <Button key="1" color="success" 
                        onClick={handleSubmit(handleSaveDialog)}>Save</Button>,
                    <Button key="2" color="danger" 
                        onClick={onClose}>Close</Button>

                ]}>

                    <form onSubmit={handleSubmit(handleSaveDialog)}>
                        <label htmlFor="name" > Name : </label>
                        <input  ref={register({required: true })} 
                            type="text" name="name" placeholder="Name..." className="form-control" />
                        {
                            errors.name && <Alert color="danger"  >Your input is required</Alert>
                        }
                        
                        <label htmlFor="code" > Code : </label>
                        <input  ref={register({required: true, maxLength: 15 })}
                            type="text" name="code" placeholder="Code..." className="form-control" />
                        {
                            errors.code?.type === 'required' && <Alert color="danger"  >Your input is required</Alert>
                        }
                         {
                            errors.code?.type === "maxLength" && <Alert color="danger"  >Your input exceed maxLength</Alert>
                        }
                        <label htmlFor="description" > Description : </label>
                        <textarea ref={register({required: true})}
                            type="text" name="description"  className="form-control" />
                    </form>

            </Dialog>


        </div>
    );
}

export default FormDialogCourse;