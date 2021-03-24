import React, {useEffect, useState} from 'react';
 
import { useParams } from 'react-router';
import { Spin,message } from 'antd';
import {defaultFilter} from '../../common/utils'
import { useSelector,useDispatch } from 'react-redux';
import {fetchCourseRequest} from '../../redux/action/courseAction'
import {fetchStudentDetail, updateEnrol} from '../../redux/action/studentAction'
import _ from 'lodash'
import {Formik,Form,Field} from 'formik'
import { Button } from 'reactstrap';



function Enrol(props) {
    const {id} = useParams();
    const {data} = useSelector(state => state.course.courses)   ;
    const {isLoading} = useSelector(state => state.course);
    const {courses} = useSelector(state => state.student.students)
    const {students} = useSelector(state => state.student)

    const [student, setStudent] = useState({}); 
     


    const dispatch = useDispatch();
 

    useEffect(()=>{
        dispatch(fetchStudentDetail(id));
        dispatch(fetchCourseRequest({...defaultFilter}));
    },[])

     
    function onSave(data){
        console.log("on save")
        const form = {
            "studentId" :  id,
            "courses": [...data.checked]
        }
        dispatch(updateEnrol(form));
        message.success('Save successfully');
    }
     
    return (
        <div>
            <h1>Enrol Course </h1>
            <div className="container">
            <Spin spinning={isLoading}>
                <div className="text-right">
                    Hello ,  {students.name}
                </div>
              { !isLoading && <Formik
                    initialValues={{
                        checked :  !isLoading && courses && courses.map(String)
                    }}
                    onSubmit={onSave}   
                    >      
                {
                    (setFieldValue , values) => (
                        <Form> 
                            <div className=" table-responsive">
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
                    )
                }
                    </Formik>} 
                </Spin>
            </div>
        </div>
    );
}

export default Enrol;