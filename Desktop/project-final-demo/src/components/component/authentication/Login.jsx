import React, { useContext } from 'react';

import { useHistory } from 'react-router-dom';
import { Form, Field, Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.css';
import 'rc-dialog/assets/bootstrap.css';
import {
    Button, Alert,
    Row,
    Col,
    Card,
    CardBody,
    CardHeader,
    Label,
    CardTitle
} from 'reactstrap'
import "./style/login.css"


import UserContext from '../../../common/UseContext'


function Login(props) {

    const [user, setUser] = useContext(UserContext);
    const history = useHistory();
    console.log("loggin render")
    const loginSchema = Yup.object({
        username: Yup.string()
            .required("Input is required!")
            .min(3, "Username must be at least 3 characters")
            .max(15, "Username must be at most 15 characters")
            .trim(),
        password: Yup.string()
            .required("Input is required!")
            .min(3, "Password must be at least 3 characters")
            .max(15, "Password must be at most 15 characters")
            .trim()
    })
    function handleOnSubmit(data) {
        if (data) {
            if (data.username === 'xomrayno1') {
                localStorage.setItem("auth", true);
                setUser({
                    ...user,
                    username: data.username,
                    password: data.password,
                    isLogin : true
                })
                history.replace("/admin/dashboard")
            }
        } else {
            history.push("/login");
        }
    }


    return (
        <div className="container">
            <div>
                <Formik
                    initialValues={{
                        username: '',
                        password: ''
                    }}
                    onSubmit={handleOnSubmit}
                    validationSchema={loginSchema}
                    validateOnBlur={false}
                    validateOnChange={false}
                >
                    {
                        <Row  >
                            <Col sm="9" md="7" lg="5" mx className="mx-auto">
                                <Card className="card card-signin my-5">
                                    <CardBody  >
                                        <CardTitle className="text-center">Sign In</CardTitle>
                                        <Form>
                                            <div className="form-label-group">
                                                <Label for="inputEmail" style={{
                                                    fontWeight: 'bold'
                                                }}> Username</Label>

                                                <Field name="username" className="form-control" placeholder="Username..." autofocus />
                                                <ErrorMessage name="username" className="error-text" component="div" />
                                            </div>
                                            <div className="form-label-group">
                                                <Label for="inputPassword" style={{
                                                    fontWeight: 'bold'
                                                }}>Password</Label>
                                                <Field name="password" type="password" className="form-control" placeholder="Password..." />
                                                <ErrorMessage name="password" className="error-text" component="div" />
                                            </div>

                                            <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
                                        </Form>

                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                    }

                </Formik>
            </div>
        </div>
    );
}

export default Login;

{/* <Form>
                                <Row>
                                    <Col md="4"></Col>
                                    <Col md="4">
                                        <label htmlFor="username">Username : </label>
                                        <Field name="username" className="form-control" />
                                        {
                                            errors.username && <p style={{
                                                color: 'red',
                                                textAlign: 'center',
                                                fontSize: '16px',
                                                marginTop: '5px',
                                                marginBottom: '5px'

                                            }}>{errors.username}</p>
                                        }
                                    </Col>
                                    <Col md="4"></Col>
                                </Row>
                                <Row>
                                    <Col md="4"></Col>
                                    <Col md="4">
                                        <label htmlFor="password">Password : </label>
                                        <Field name="password" type="password" className="form-control" />
                                        {
                                            errors.password && <p style={{
                                                color: 'red',
                                                textAlign: 'center',
                                                fontSize: '16px',
                                                marginTop: '5px',
                                                marginBottom: '5px'

                                            }}>{errors.password}</p>
                                        }
                                    </Col>
                                    <Col md="4"></Col>
                                </Row>
                                <Button color="primary" type="submit">Login</Button>
                            </Form> */}