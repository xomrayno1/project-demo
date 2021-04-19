import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'reactstrap'
import { Spin } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import Dialog from 'rc-dialog';
import 'bootstrap/dist/css/bootstrap.css';
import 'rc-dialog/assets/bootstrap.css';


import TableCourse from '../../component/course/TableCourse'
import { addCourse, fetchCourseRequest, updateCourse, deleteCourse } from '../../redux/action/courseAction'
import { defaultFilter } from '../../common/utils'
import './styles/styles.css'

import _ from 'lodash'
import courseApi from '../../api/courseApi';
import CourseModal from './CourseModal';

function CourseList(props) {
    const dispatch = useDispatch();
    const { isLoading } = useSelector(state => state.course);
    const { data, pagination } = useSelector(state => state.course.courses);
    const [filter, setFilter] = useState({ ...defaultFilter })

    const [visbleDialogForm, setVisbleDialogForm] = useState(false);

    console.log("course list render")



    useEffect(() => {
        dispatch(fetchCourseRequest(filter));
    }, [filter])

    const searchRef = useRef();

    function handleSubmitSearch(e) {
        e.preventDefault();
        setFilter({
            ...filter,
            search: searchRef.current.value,
            page: 1
        })

    }

    function handleVisible(value) {
        setVisbleDialogForm(value)
    }

    function handlePagination(page) {
        setFilter({
            ...filter,
            page: page
        })
    }


    function handleDeleteItem(id) {
        dispatch(deleteCourse(id));
    }

    return (
        <div className="container">
            <h1>Courses List</h1>
            <div className="row" style={{
                marginBottom: '20px'
            }}>
                <div className="col-sm-3 text-left">
                    <Button color="success" key={1} style={{
                        fontFamily: '-moz-initial',
                        padding: '6px 20px 6px 20px'
                    }}
                        onClick={() => handleVisible(true)}
                    >Add</Button>
                </div>
                <div className="col-sm-3">
                </div>

                <div className="col-sm-4 text-right">
                    <form onSubmit={handleSubmitSearch} id="formSearch">
                        <input className="form-control" ref={searchRef}
                            type="text" placeholder="Search name ..." />
                    </form>
                </div>
                <div className="col-sm-2 text-right" >
                    <Button type="submit" form="formSearch" color="primary">Search</Button>
                </div>

            </div>
            <Spin spinning={isLoading}>
                <TableCourse
                    key={1}
                    data={data}
                    pagination={pagination}
                    handlePagination={handlePagination}
                    handleDeleteItem={handleDeleteItem}
                />
            </Spin>

            <CourseModal visible={visbleDialogForm} onCloseDialog={() => handleVisible(false)} />
        </div>
    )
}

export default CourseList;