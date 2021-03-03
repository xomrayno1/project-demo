import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import studentApi from '../../api/studentApi';
import TableStudent from './TableStudent';
import { useTable } from 'react-table'

import FormDialogStuden from './FormDialogStudent'
import { Button } from 'reactstrap';

StudentList.propTypes = {
    
};

function StudentList(props) {
    const [students, setStudents] = useState([]);
    const [visible,setVisible] = useState(false);
    const [action, setAction] = useState({action : 0});
    const columns = [
        {
            Header : 'Id',
            accessor: 'id'
        },{
            Header : 'Name',
            accessor: 'name'
        },{
            Header : 'Code',
            accessor: 'code'
        }
        ,{
            Header : 'Email',
            accessor: 'email'
        }
        ,{
            Header : 'Address',
            accessor: 'address'
        },{
            Header : ' + ',
            // Cell: (value) => (<Button color="warning" onClick={()=>
            //                      handleButtonEdit(value.row)}>Edit</Button>)
        }
    ]
     
    useEffect(() => {
        const fetch =  async () => {
            const response = await studentApi.getAll({limit : 5, page: 1});
            const { data  } = response
            setStudents(data);
        }
        fetch();
    },[action])
    
    // function handleButtonEdit(value){
       
    //     const { id } = value.values;
    //     const response = studentApi.getById(id);
    //     console.log(response)
    // }

    function handleSaveStudent(forms){
        if(forms['id']){
            studentApi.update(forms);
            setAction({...action,create : ++action['action']})
        }else{
            studentApi.create(forms);
            setAction({...action,update : ++action['action']})
        }
    }
    function handleVisibleOnClick(value){
        setVisible(value);
    }
   
    return (
        <div className="container">
            <h1>Student List</h1>
            <Button   color="success" onClick={() =>  setVisible(true) }   outline style={{marginBottom : '10px'}} > Add</Button>
            <FormDialogStuden handleSaveStudent={handleSaveStudent} 
                                handleVisibleOnClick={handleVisibleOnClick}
                                 visible={visible}/>
            <TableStudent data={students} columns={columns}    />
        </div>
    );
}

export default StudentList;