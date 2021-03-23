import React, {useEffect, useState} from 'react';
 
import { useParams } from 'react-router';
import { Table } from 'antd';
import {defaultFilter} from '../../common/utils'
import { useSelector,useDispatch } from 'react-redux';
import {fetchCourseRequest} from '../../redux/action/courseAction'
import {fetchStudentDetail} from '../../redux/action/studentAction'
import _ from 'lodash'
import {Formik,Form,Field} from 'formik'
import { Button } from 'reactstrap';

function Enrol(props) {
    const {id} = useParams();
    const {data} = useSelector(state => state.course.courses);
    const {pagination} = useSelector(state => state.course.courses);
   // const {students} = useSelector(state => state.student)
    const dispatch = useDispatch();
    
   
    
    useEffect(()=>{
        dispatch(fetchCourseRequest({...defaultFilter}));
        //dispatch(fetchStudentDetail(id));
    },[])

    const columns = [
        {
            title : 'Code',
            dataIndex : 'code',
            key : 'code',
            with: 200,
            align : 'center'            
        },{
            title : 'Name',
            dataIndex : 'name',
            key : 'name',
            with: 200,
            align : 'center'       
        },{
            title : 'Enrol',
            dataIndex : 'enrol',
            with: 50,
            align : 'center',
            render : (item,record) => {
                
                //const check = record.students.indexOf(id) != -1 ? true : false;
                return (
                    // <Checkbox key={record.id}  value={record.id}
                    //         // checked={checked}
                    //         onChange={hanldeEnrolOnChange}
                    // />
                    
                    <Field type="checkbox" name="checked" value={record.id}/>
                )
            }
        }
    ]
     
    // function hanldeEnrolOnChange(e){
    //     if(e.target.checked){
    //         setEnrol({
    //             ...enrol,
    //             values: [...enrol.values, e.target.value]
    //         })
    //     }else{
    //         const idx = enrol.values.indexOf(e.target.value);
    //         setEnrol({
    //             ...enrol,
    //             values: [
    //                 ...enrol.values.slice(0,idx),
    //                 ...enrol.values.slice(idx + 1)
    //             ]
    //         })
    //     }
    //     setChecked(!checked); 
    // }
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
                         <Table columns={columns} 
                            dataSource={data}
                            size="middle" 
                            bordered
                            />
                        <div>
                            <Button color="success"
                                    style={{
                                        padding: '5px 15px 5px 15px',
                                        marginTop: '20px'
                                    }}
                                    type="submit"
                                    onClick={onSave}
                                    >Save</Button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}

export default Enrol;