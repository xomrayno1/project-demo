import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'rc-dialog';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'rc-dialog/assets/bootstrap.css';

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
    const [forms, setForms] = useState({});

    useEffect(() => {
        const { form } = formDialog;
        setForms({
            id: form.id,
            name: form.name,
            code: form.code,
            description : form.description
        })
    }, [formDialog])


    const onClose = () => {
        if (!handleVisibleOnClick) { return; }
        handleVisibleOnClick(false);
    }
    const handleSaveDialog = (e) => {
        e.preventDefault();
        if (!handleSaveCourse) { return; }
        handleSaveCourse(forms);
        onClose();
    }
    const handleInputNameChange = (e) => {
        setForms({ ...forms, name: e.target.value });
    }
    const handleInputCodeChange = (e) => {
        setForms({ ...forms, code: e.target.value });
    }
    const handleInputDescriptionChange = (e) => {
        setForms({ ...forms, description: e.target.value });
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
                    <Button key="1" color="success" 
                        onClick={handleSaveDialog}>Save</Button>,
                    <Button key="2" color="danger" 
                        onClick={onClose}>Close</Button>

                ]}>

                <label htmlFor="name" > Name : </label>
                <input value={forms.name} onChange={handleInputNameChange}
                    type="text" name="name" placeholder="Name..." className="form-control" />
                <label htmlFor="code" > Code : </label>
                <input value={forms.code} onChange={handleInputCodeChange}
                    type="text" name="code" placeholder="Code..." className="form-control" />
                 <label htmlFor="description" > Description : </label>
                <textarea value={forms.description} onChange={handleInputDescriptionChange}
                    type="text" name="description"  className="form-control" />

            </Dialog>


        </div>
    );
}

export default FormDialogCourse;