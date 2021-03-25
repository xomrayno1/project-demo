import React, {useEffect, useState} from 'react';
import { Button } from 'reactstrap'
import {Spin} from 'antd'
import {useSelector,useDispatch} from 'react-redux'
import Dialog from 'rc-dialog';
import 'bootstrap/dist/css/bootstrap.css';
import 'rc-dialog/assets/bootstrap.css';
import {useFormik} from 'formik'
import * as yup from 'yup'  

import TableCourse from '../../component/course/TableCourse'
import {addCourse, fetchCourseRequest, updateCourse, deleteCourse} from '../../redux/action/courseAction'
import {defaultFilter} from '../../common/utils'
import './styles/styles.css' 

import _ from 'lodash'
import courseApi from '../../api/courseApi';

function CourseList(props) {
    const dispatch = useDispatch();
    const {isLoading} = useSelector(state => state.course);
    const {data,pagination} = useSelector(state => state.course.courses);
    const [filter,setFilter] = useState({...defaultFilter})
    const [dialog, setDialog] = useState({
        id : '',
        visible : false
    });
   

    console.log("course list render")
    const formik = useFormik({
        initialValues : {
            name : '',
            code : '',
            description : ''
        },
        validationSchema : () => {
           return  yup.object({
                name :   yup.string().required("Please input name ! ")
                                    .min(6,"name length must be between 6 to 22")
                                    .max(22,"name length must be between 6 to 22"),
                code :   yup.string().required("Please input code ! ")
                                    .min(3,"name length must be between 3 to 12")
                                    .max(12,"name length must be between 3 to 12")
                                    .test('code','Duplicate field', async value =>   {
                                        console.log(value)
                                        const form = {
                                            code : value,
                                            id : dialog.id
                                        }
                                        const data = await  courseApi.checkCode(form);
                                        return data === 200 ? true : false
                                    })
                                    
            })
        },
        onSubmit: submitFormDialog,
        validateOnBlur : false,
        validateOnChange: false,
    });
 
 
    useEffect(()=>{
        dispatch(fetchCourseRequest(filter));
    },[filter])

    function handleSearchName(e){
        const search = _.debounce(function (){
            setFilter({
                ...filter,
                search : e.target.value,
                page : 1
            })
        },400)
        search();
         
    }
    function handleAddClick(){
        formik.resetForm({
            values : {
                name : '',
                code: '',
                description: ''
            }
        });
        setDialog({
            ...dialog,
            id : '',
            visible : true
        })
    }
    function handlePagination(page){
        setFilter({
            ...filter,
            page : page
        })
    }
    function onCloseDialog(){
        console.log("on close")
        setDialog({
            ...dialog,
            visible : false
        })
    }
    function submitFormDialog(data){
        console.log("on submitForm")
         /// push to database
        if(data.id){
            dispatch(updateCourse(data));
            console.log("edit")
        }else{
            dispatch(addCourse(data))
            console.log("add")
        }
        setDialog({
            ...dialog,
            visible : false
        })
    }
    function handleEditItem(forms){
        const {form, visible} = forms;
        
        setDialog({
            ...dialog,
            visible : visible,
            id : form.id
        })
        formik.resetForm({
            values : {
               ...form,
            }
        })
    }
    function handleDeleteItem(id){
        dispatch(deleteCourse(id));
    }
    
    return (
        <div className="container"> 
            <h1>Courses List</h1>
            <div className="row" style={{
                marginBottom: '20px'
                }}>
                <div className="col-sm-3 text-left">
                    <Button color="success" style={{
                        fontFamily : '-moz-initial',
                        padding : '6px 20px 6px 20px'
                        }}
                        onClick={handleAddClick}    
                    >Add</Button>
                </div>
                <div className="col-sm-6">
                    
                </div>
                <div className="col-sm-3"  >
                    <input  className="form-control" onChange={handleSearchName}
                        type="text" placeholder="Search name ..."  />
                </div>
            </div>
            <Spin spinning={isLoading}>
                <TableCourse
                    data={data} 
                    pagination={pagination} 
                    handlePagination={handlePagination}
                    handleEditItem={handleEditItem}
                    handleDeleteItem={handleDeleteItem}
                />
            </Spin>
            <Dialog
                style={{ width: 600 }}
                title={<div style={{
                    fontFamily: '-moz-initial',
                    fontSize : '20px',
                    textAlign : 'center'
                }}>Save</div>}
                onClose={onCloseDialog}
                visible={dialog.visible}
                animation="slide-fade"
               
                >
                            <form onSubmit={formik.handleSubmit}> 
                                        <div>
                                            <label  htmlFor="name">Name : </label>
                                            <input  name="name" className="form-control" 
                                                value={formik.values.name} onChange={formik.handleChange}

                                                    />
                                            {
                                                formik.errors.name ? <p className="error-message">{formik.errors.name}</p>  : null
                                            }
                                        </div>
                                        <div>
                                            <label  htmlFor="code">Code : </label>
                                            <input  name="code" className="form-control"  
                                                value={formik.values.code} onChange={formik.handleChange}
                                                   /> 
                                            {
                                                formik.errors.code ? <p className="error-message">{formik.errors.code}</p>  : null
                                            }
                                        </div>
                                        <div>
                                            <label  htmlFor="description">Description : </label>
                                            <textarea    name="description" className="form-control"
                                                value={formik.values.description} onChange={formik.handleChange}
                                                />
                                        </div>
                                        <div className="footer-dialog">
                                            <Button key="1" color="success" type="submit">Save</Button>,
                                            <Button key="2" color="danger" onClick={onCloseDialog} >Close</Button>
                                        </div>
                                </form>    
            </Dialog>
        </div>
    )
}

export default CourseList;