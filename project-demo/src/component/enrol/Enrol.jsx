import React, {useEffect, useState} from 'react';
 
import { useParams } from 'react-router';
import { Spin } from 'antd';
import {defaultFilter} from '../../common/utils'
import { useSelector,useDispatch } from 'react-redux';
import {fetchCourseRequest} from '../../redux/action/courseAction'
import {fetchStudentDetail} from '../../redux/action/studentAction'
import _ from 'lodash'
import {Formik,Form,Field} from 'formik'
import { Button } from 'reactstrap';



function Enrol(props) {
    const {id} = useParams();
    const {data} = useSelector(state => state.course.courses)   ;
    const {pagination} = useSelector(state => state.course.courses);
    const {isLoading} = useSelector(state => state.course);
   // const {students} = useSelector(state => state.student)
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(fetchCourseRequest({...defaultFilter}));
        //dispatch(fetchStudentDetail(id));
    },[])

  
      
    function onSave(data){
        console.log("on save")
        console.log(data)
    }
     
    return (
        <div>
            <h1>Enrol Course , Hello {id}</h1>
            <div className="container">
                <Formik
                    initialValues={{
                        checked : []
                    }}
                    onSubmit={onSave}  
                >      
                    <Form> 
                        <div className=" table-responsive">
                        <Spin spinning={isLoading}>
                            <table  className="table">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Code</th>
                                        <th>Name</th>
                                        <th> + </th>
                                    </tr>
                                </thead>
                                     
                                        <tbody>
                                            {
                                                data && data.map((item,idx) => {                                    
                                                    const {students} = item;
                                                    const flag = students.indexOf(parseInt(id)) !== -1 ? true : false  ;
                                                    return  (
                                                        <tr key={idx}>
                                                            <td>{idx + 1}</td>
                                                            <td>{item.code}</td>
                                                            <td>{item.name}</td>
                                                            <td>
                                                                <Field 
                                                                    key={idx}
                                                                    type="checkbox"
                                                                    name="checked"
                                                                    value={`${item.id}`}

                                                                />
                                                               
                                                            </td>
                                                        </tr>
                                                    )}
                                                )       
                                            }
                                        </tbody>
                                </table>
                            </Spin>
                        </div>
                            <div>
                                <Button color="success"
                                        style={{
                                            padding: '5px 15px 5px 15px',
                                            marginTop: '20px'
                                        }}
                                        type="submit">Save</Button>
                            </div>
                        </Form>
                    </Formik> 
            </div>
        </div>
    );
}

export default Enrol;