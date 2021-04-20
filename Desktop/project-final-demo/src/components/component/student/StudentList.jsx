import React, { useEffect, useState, useRef } from 'react';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux'
import { Spin } from 'antd'
import { Button, CardHeader } from 'reactstrap'
import {
    Row,
    Col,
    Container,
    Card,
    CardBody
} from 'reactstrap'

import TableStudent from './TableStudent'
import { fetchStudentRequest, addRowStudent } from '../../../redux/action/studentAction'
import { defaultFilter } from '../../../common/utils'
import {
    ADD_EVENT,
} from '../../../common/Constant'

function StudentList(props) {

    console.log("studentList render.....")
    const dispatch = useDispatch();
    const { data } = useSelector(state => state.student.students)
    const { pagination } = useSelector(state => state.student.students)
    const { isLoading } = useSelector(state => state.student)
    const typingTimeoutRef = useRef(false);
    const [filter, setFilter] = useState({ ...defaultFilter })

    const { isAdd } = useSelector(state => state.app)

    useEffect(() => {
        dispatch(fetchStudentRequest(filter));
    }, [filter])

    const searchRef = useRef()
    function handleSearchName(e) {
        e.preventDefault();
        setFilter({
            ...filter,
            search: searchRef.current.value,
            page: 1
        })
    }
    function handlePagination(page) {
        setFilter({
            ...filter,
            page: page,
        })
    }
    function handleAddClick() {
        console.log("add click")
        const newData = {
            id: '',
            name: '',
            email: '',
            code: '',
            address: ''
        }
        dispatch(addRowStudent(newData));
        dispatch({ type: ADD_EVENT, payload: true })
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
                                    <Button color="success" style={{
                                        fontFamily: '-moz-initial',
                                        padding: '6px 20px 6px 20px'
                                    }}
                                        onClick={handleAddClick}
                                        disabled={isAdd}
                                    >
                                        Add
                                    </Button>
                                </Col>
                                <Col md="8"  >
                                    <Row>
                                        <Col md="6"></Col>
                                        <Col md="4" className="text-right">
                                            <form onSubmit={handleSearchName} id="form-search">
                                                <input className="form-control" ref={searchRef}
                                                    type="text" placeholder="Search name ..." />
                                            </form>
                                        </Col>
                                        <Col md="2" className="text-right" >
                                            <Button color="primary" type="submit" form="form-search">Search</Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Spin spinning={isLoading}>
                                <TableStudent
                                    data={data}
                                    pagination={pagination}
                                    handlePagination={handlePagination}
                                />
                            </Spin>
                        </CardBody>
                    </Card>
                </Col>

            </Row>

        </>
    );
}

export default StudentList;