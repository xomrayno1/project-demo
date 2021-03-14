import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'rc-dialog';
import { Button,Alert } from 'reactstrap';
 
import { useSelector } from 'react-redux'
import _ from 'lodash'
import { useForm } from 'react-hook-form';

import { setStudent,setFormStudent } from '../../action/action'
import store from '../../reducer/index'
import 'bootstrap/dist/css/bootstrap.css';
import 'rc-dialog/assets/bootstrap.css';

FormDialogStudent.propTypes = {
    handleSaveStudent: PropTypes.func,
    handleVisibleOnClick: PropTypes.func,
    formDialog: PropTypes.object

};
FormDialogStudent.defaultProps = {
    handleSaveStudent: null,
    handleVisibleOnClick: null,
    formDialog: null
}
function FormDialogStudent(props) {
    const { visible, handleVisibleOnClick, handleSaveStudent } = props;
    const { form } = useSelector(state => state.formStudent);
     
    console.log( "form render..")
    const { register, handleSubmit,errors ,watch,setValue,clearErrors } = useForm();
    

    useEffect(() => {
        setValue('id' , form['id'])
        setValue('name' , form['name'])         
        setValue('code' , form['code'])  
        setValue('email' , form['email'])
        setValue('address' , form['address'])
    },[form])

    const onClose = () => {
        if (!handleVisibleOnClick) { return; }
        handleVisibleOnClick(false);
        clearErrors();
    }
 
    const handleSaveDialog = (data) => {
        data = {...data, id : form['id']};
        console.log(data);
        handleSaveStudent(data);
        onClose();
    }
 
    return (
        <div>
            <Dialog
                style={{ width: 600 }}
                title={<div>Save</div>}
                onSubmit={handleSubmit(handleSaveDialog)}
                onClose={onClose}
                visible={visible}
                animation="slide-fade"
                footer={[
                    <Button    key="1" color="success" type="submit" onClick={handleSubmit(handleSaveDialog)} >Save</Button>,
                    <Button    key="2" color="danger" onClick={onClose}>Close</Button>
                ]}>
 
               <form    onSubmit={handleSubmit(handleSaveDialog)}  >
                    <label htmlFor="name" > Name : </label>
                    <input  type="text" name="name" ref={register({ required: true })}  
                        placeholder="Name..." className="form-control"  />
                    { 
                        
                        errors.name  &&   <Alert color="danger"  >Your input is required</Alert> 
                    }
                    <label htmlFor="code" > Code : </label>
                    <input  type="text" name="code"  ref={register({ required: true,maxLength: 12 })}  
                        placeholder="Code..." className="form-control" />
                    {
                        errors.code?.type === 'required'  &&   <Alert color="danger"  >Your input is required</Alert>
                    }
                    {
                        errors.code?.type === 'maxLength'  &&   <Alert color="danger"  >Your input exceed maxLength</Alert>
                    }
                    <label htmlFor="email" > Email : </label>
                    <input  ref={register({ required: true })}
                        type="text" name="email" placeholder="Email..." className="form-control" />
                    {
                        errors.email  &&   <Alert color="danger"  >Your input is required</Alert>
                    }
                    <label htmlFor="address" > Address : </label>
                    <input  ref={register({ required: true })}
                        type="text" name="address" placeholder="Address..." className="form-control" />
                    {
                        errors.address  &&   <Alert color="danger"  >Your input is required</Alert>
                    }
                </form>    

            </Dialog>


        </div>
    );
}

export default FormDialogStudent;