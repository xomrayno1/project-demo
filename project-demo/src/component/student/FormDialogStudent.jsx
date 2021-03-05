import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'rc-dialog';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'rc-dialog/assets/bootstrap.css';
import { useSelector } from 'react-redux'

import { setStudent,setFormStudent } from '../../action/action'
import store from '../../reducer/index'

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
 
    const formDialog = useSelector(state => state.formStudent);
     
 
    const onClose = () => {
        if (!handleVisibleOnClick) { return; }
        handleVisibleOnClick(false);
    }
    const handleSaveDialog = (e) => {
        e.preventDefault();
        if (!handleSaveStudent) { return; }
        handleSaveStudent(formDialog);
        onClose();
    }
    const handleInputNameChange = (e) => {
       
        store.dispatch(setFormStudent(
            { ...formDialog, form : {
                    name: e.target.value
                } 
            }
        ));
    }
    const handleInputCodeChange = (e) => {
       
       store.dispatch(setFormStudent(
            { ...formDialog, form : {
                code: e.target.value
                } 
            }
        ));
    }
    const handleInputEmailChange = (e) => {
     
        store.dispatch(setFormStudent(
            { ...formDialog, form : {
                email: e.target.value
                } 
             }
        ));
    }
    const handleInputAddressChange = (e) => {
         
        store.dispatch(setFormStudent(
            { ...formDialog, form : {
                address: e.target.value
                 } 
            }
        ));
    }

    return (
        <div>
            <Dialog
                style={{ width: 600 }}
                title={<div>Save</div>}
                onClose={onClose}
                visible={visible}
                animation="slide-fade"
                footer={[
                    <Button key="1" color="success" onClick={handleSaveDialog}>Save</Button>,
                    <Button key="2" color="danger" onClick={onClose}>Close</Button>

                ]}>

                <label htmlFor="name" > Name : </label>
                <input value={formDialog.form.name} onChange={handleInputNameChange}
                    type="text" name="name" placeholder="Name..." className="form-control" />
                <label htmlFor="code" > Code : </label>
                <input value={formDialog.form.code} onChange={handleInputCodeChange}
                    type="text" name="code" placeholder="Code..." className="form-control" />
                <label htmlFor="email" > Email : </label>
                <input value={formDialog.form.email} onChange={handleInputEmailChange}
                    type="text" name="email" placeholder="Email..." className="form-control" />
                <label htmlFor="address" > Address : </label>
                <input value={formDialog.form.address} onChange={handleInputAddressChange}
                    type="text" name="address" placeholder="Address..." className="form-control" />

            </Dialog>


        </div>
    );
}

export default FormDialogStudent;