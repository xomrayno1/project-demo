import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap'
import TableCourse from './TableCourse';
import coursesApi from '../../api/courseApi';
CourseList.propTypes = {
    
};

function CourseList(props) {
    const [courses, setCourses] = useState([]);
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
        },{
            Header : 'Description',
            accessor: 'description'
        }
    ]

    useEffect( () => {
        const fetch = async () => {
            const response = await coursesApi.getAll({limit: 5, page: 1});
            const { data } = response;
            setCourses(data);
        }
        fetch();
    },[])
   
    return (
        <div className="container">
            <h1>Course List</h1>
            <Button color="success"   outline style={{marginBottom : '10px'}} > Add</Button>
            <TableCourse data={courses} columns={columns}/>
        </div>
    );
}

export default CourseList;