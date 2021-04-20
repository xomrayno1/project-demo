import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Spin, message, Space, Button } from 'antd';
import _ from 'lodash'
import { Formik, Form, Field } from 'formik'
import { Row, Col, Card, CardBody, CardHeader } from 'reactstrap';

import { defaultFilter } from '../../../common/utils'
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourseRequest } from '../../../redux/action/courseAction'
import { fetchStudentDetail, updateEnrol } from '../../../redux/action/studentAction'


function Enrol(props) {
    const { id } = useParams();
    const { data } = useSelector(state => state.course.courses);
    const { isLoading } = useSelector(state => state.course);
    const { courses } = useSelector(state => state.student.student)
    const { student } = useSelector(state => state.student)
    const dispatch = useDispatch();

    const history = useHistory();

    useEffect(() => {
        dispatch(fetchStudentDetail(id));
        dispatch(fetchCourseRequest({ ...defaultFilter }));
    }, [])


    function onSave(data) {
        const form = {
            "studentId": id,
            "courses": [...data.checked]
        }
        dispatch(updateEnrol(form));
    }
    function onBack() {
        history.push("/admin/students")
    }
    return (
        <>
            <Row>
                <Col md="12">
                    <Card className="strpied-tabled-with-hover">
                        <CardBody className="table-full-width  px-0">

                            <Row>
                                <Col md="12">
                                    <Spin spinning={isLoading}  >
                                        {!isLoading && <Formik
                                            initialValues={{
                                                checked: !isLoading && courses && courses.map(String)
                                            }}
                                            onSubmit={onSave}
                                        >
                                            {
                                                (setFieldValue, values) => (
                                                    <Form>
                                                        <div className=" table-responsive table-hover table-striped">
                                                            <table className="table table-bordered">
                                                                <thead   >
                                                                    <tr>
                                                                        <th  >STT</th>
                                                                        <th>Code</th>
                                                                        <th>Name</th>
                                                                        <th> + </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        data && data.map((item, idx) => {

                                                                            return (
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
                                                                            )
                                                                        }
                                                                        )
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <Row>
                                                            <Col md="12" className="text-center">
                                                                <Space>
                                                                    <Button type="primary" htmlType="submit">
                                                                        Save
                                                                    </Button>
                                                                    <Button
                                                                        htmlType="button"
                                                                        onClick={onBack}
                                                                    >
                                                                        Back
                                                                    </Button>
                                                                </Space>
                                                            </Col>
                                                        </Row>
                                                    </Form>
                                                )
                                            }
                                        </Formik>}
                                    </Spin>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>


    );
}

export default Enrol;