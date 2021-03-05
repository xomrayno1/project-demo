import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'rc-dialog';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'rc-dialog/assets/bootstrap.css';
import { useSelector } from 'react-redux'
import _ from 'lodash'

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
    const { form } = useSelector(state => state.formStudent);
    const [forms, setForms] =  useState({});
     
    console.log("form render..")

    useEffect(()=>{
        setForms({
            id: form.id,
            name: form.name,
            code: form.code,
            email: form.email,
            address: form.address
        })
    },[form])

    const onClose = () => {
        if (!handleVisibleOnClick) { return; }
        handleVisibleOnClick(false);
    }

    const handleSaveDialog = (e) => {
        e.preventDefault();
        if (!handleSaveStudent) { return; }
        handleSaveStudent(forms);
        onClose();
    }

    const handleInputNameChange = (e) => {
        setForms({...forms,
            name : e.target.value
        })
    }

    const handleInputCodeChange = (e) => {
        setForms({...forms,
            code : e.target.value
        })
    }

    const handleInputEmailChange = (e) => {
        setForms({...forms,
            email : e.target.value
        })
    }

    const handleInputAddressChange = (e) => {     
        setForms({...forms,
            address : e.target.value
        })
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
                    type="text" name="address" placeholder="Address..." className="form-control" />

            </Dialog>


        </div>
    );
}

export default FormDialogStudent;