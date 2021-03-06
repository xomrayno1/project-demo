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
    //const [forms, setForms] =  useState({});
    console.log( "form render..")
    const { register, handleSubmit,errors ,watch,setValue,clearErrors } = useForm();
    

    useEffect(() => {
        // setForms({
        //     id: form.id,
        //     name: form.name,
        //     code: form.code,
        //     email: form.email,
        //     address: form.address
        // })
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

    // const handleSaveDialog = (data) => {
    //     e.preventDefault();
    //     if (!handleSaveStudent) { return; }
    //     handleSaveStudent(forms);
    //     onClose();
    // }
    const handleSaveDialog = (data) => {
        data = {...data, id : form['id']};
        console.log(data);
        handleSaveStudent(data);
        onClose();
    }

    // const handleInputNameChange = (e) => {
    //     setForms({...forms,
    //         name : e.target.value
    //     })
    // }

    // const handleInputCodeChange = (e) => {
    //     setForms({...forms,
    //         code : e.target.value
    //     })
    // }

    // const handleInputEmailChange = (e) => {
    //     setForms({...forms,
    //         email : e.target.value
    //     })
    // }

    // const handleInputAddressChange = (e) => {     
    //     setForms({...forms,
    //         address : e.target.value
    //     })
    // }

    console.log(errors)
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

                {/* <label htmlFor="name" > Name : </label>
                <input value={forms.name} onChange={handleInputNameChange}
                    type="text" name="name" placeholder="Name..." className="form-control" />
                <label htmlFor="code" > Code : </label>
                <input value={forms.code} onChange={handleInputCodeChange}
                    type="text" name="code" placeholder="Code..." className="form-control" />
                <label htmlFor="email" > Email : </label>
                <input value={forms.email} onChange={handleInputEmailChange}
                    type="text" name="email" placeholder="Email..." className="form-control" />
                <label htmlFor="address" > Address : </label>
                <input value={forms.address} onChange={handleInputAddressChange}
                    type="text" name="address" placeholder="Address..." className="form-control" /> */}


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