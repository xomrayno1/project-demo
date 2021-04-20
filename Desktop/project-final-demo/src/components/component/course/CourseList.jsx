import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'reactstrap'
import { Spin } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import Dialog from 'rc-dialog';
import 'bootstrap/dist/css/bootstrap.css';
import 'rc-dialog/assets/bootstrap.css';
import _ from 'lodash'
import { Col, Row, Card, CardBody } from 'reactstrap'

import TableCourse from '../../component/course/TableCourse'
import { addCourse, fetchCourseRequest, updateCourse, deleteCourse } from '../../../redux/action/courseAction'
import { defaultFilter } from '../../../common/utils'
import './styles/styles.css'
import courseApi from '../../../api/courseApi';
import CourseModal from './CourseModal';

function CourseList(props) {
    const dispatch = useDispatch();
    const { isLoading } = useSelector(state => state.course);
    const { data, pagination } = useSelector(state => state.course.courses);
    const [filter, setFilter] = useState({ ...defaultFilter })

    const [visbleDialogForm, setVisbleDialogForm] = useState(false);
    const [dataModal, setDataModal] = useState('');

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
    function handleOnClickEditItem(form){
        setDataModal(form)
        setVisbleDialogForm(true)
    }
    return (
        <>
            <Row>
                <Col md="12">
                    <Card >
                        <CardBody >
                            <Row style={{
                                marginBottom: '20px'
                            }}>
                                <Col md="4" className="text-left">
                                    <Button color="success" key={1} style={{
                                        fontFamily: '-moz-initial',
                                        padding: '6px 20px 6px 20px'
                                    }}
                                        onClick={() => handleVisible(true)}
                                    >Add</Button>
                                </Col>
                                <Col md="8"  >
                                    <Row>
                                        <Col md="6"></Col>
                                        <Col md="4" className="text-right">
                                            <form onSubmit={handleSubmitSearch} id="formSearch">
                                                <input className="form-control" ref={searchRef}
                                                    type="text" placeholder="Search name ..." />
                                            </form>
                                        </Col>
                                        <Col md="2" className="text-right" >
                                            <Button type="submit" form="formSearch" color="primary">Search</Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12">
                                    <Spin spinning={isLoading}>
                                        <TableCourse
                                            key={1}
                                            data={data}
                                            pagination={pagination}
                                            handlePagination={handlePagination}
                                            handleDeleteItem={handleDeleteItem}
                                            handleOnClickEditItem={handleOnClickEditItem}
                                        />
                                    </Spin>
                                    <CourseModal item={dataModal} visible={visbleDialogForm}  onCloseDialog={() => handleVisible(false)} />
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>

    );
}

export default CourseList;