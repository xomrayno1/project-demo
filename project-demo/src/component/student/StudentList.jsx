import React, { useEffect, useState, useRef } from 'react';
import _ from 'lodash';
import { useSelector,useDispatch } from 'react-redux'
import {Spin} from 'antd'
import TableStudent from './TableStudent';
 
import { fetchStudentRequest } from '../../redux/action/studentAction'
import store from '../../redux/reducer/index'


import './styles/style.css';
 
function StudentList(props) {
    
    console.log("studentList render.....")
    const dispatch = useDispatch();
    const {data} = useSelector(state => state.student.students)
    const {pagination} = useSelector(state => state.student.students)
    const {isLoading} = useSelector(state=> state.student)
    const typingTimeoutRef = useRef(false);
    const [filter,setFilter] = useState({
        limit : 10,
        page : 1,
        search : ''
    })
  

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
             search : e.target.value
         })
       },400)
    }
    function handlePagination(){
        console.log("pagi")
    }
    
    return (
       <div className="container"> 
            <h1>Student List</h1>
            <div className="row">
                <div className="col-sm-9"></div>
                <div className="col-sm-3" style={{marginBottom : '25'}}>
                    <input  className="form-control" onChange={handleSearchName}
                        type="text" placeholder="Search name ..."  />
                </div>
            </div>
            
           <Spin spinning={isLoading}>
                {
                    !isLoading && <TableStudent 
                        data={data} 
                        pagination={pagination} 
                        handlePagination={handlePagination}
                    />
                }
           </Spin>
          
       </div>
    )
}

export default StudentList;