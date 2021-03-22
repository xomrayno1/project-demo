import React, { useEffect, useState, useRef } from 'react';
import _ from 'lodash';
import { useSelector,useDispatch } from 'react-redux'
import { Spin } from 'antd'
import {Button} from 'reactstrap'

import TableStudent from './TableStudent'
import { fetchStudentRequest,addRowStudent } from '../../redux/action/studentAction'
import { defaultFilter } from '../../common/utils'
import './styles/style.css';
import {
    ADD_EVENT,
    EDIT_EVENT
} from '../../common/Constant'


 
function StudentList(props) {
    
    console.log("studentList render.....")
    const dispatch = useDispatch();
    const {data} = useSelector(state => state.student.students)
    const {pagination} = useSelector(state => state.student.students)
    const {isLoading} = useSelector(state=> state.student)
    const typingTimeoutRef = useRef(false);
    const [filter,setFilter] = useState({...defaultFilter})
  
    const {isAdd} = useSelector(state => state.app)

    useEffect(()=>{
        dispatch(fetchStudentRequest(filter));
    },[filter])

    
    function handleSearchName(e){
       if(typingTimeoutRef.current){
           clearTimeout(typingTimeoutRef.current); 
       }
       typingTimeoutRef.current  = setTimeout(()=> {
         setFilter({
             ...filter,
             search : e.target.value,
             page : 1
         })
       },400)
    }
    function handlePagination(page){
        setFilter({
            ...filter,
            page : page,
        })
    }
    function handleAddClick(){
        console.log("add click")
        const newData = {
            id : '',
            name : '',
            email : '',
            code : '',
            address : ''
        }
        dispatch(addRowStudent(newData));
        dispatch({type : ADD_EVENT, payload : true})
    }

    
    return (
       <div className="container"> 
            <h1>Student List</h1>
            <div className="row" style={{
                marginBottom: '20px'
                }}>
                <div className="col-sm-3 text-left">
                    <Button color="success" style={{
                        fontFamily : '-moz-initial',
                        padding : '6px 20px 6px 20px'
                        }}
                        onClick={handleAddClick}
                        disabled={isAdd}
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
                    <TableStudent
                        data={data} 
                        pagination={pagination} 
                        handlePagination={handlePagination}
                    />
           </Spin>
          
       </div>
    )
}

export default StudentList;