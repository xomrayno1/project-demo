import React, {useContext} from 'react';
 
import { Button,Alert } from 'reactstrap';
import {  useHistory } from 'react-router-dom';
import { Form,Field,Formik,ErrorMessage} from 'formik'
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.css';
import 'rc-dialog/assets/bootstrap.css';

 
import UserContext  from '../../common/UseContext'
 
 

function Login(props) {
  
    const [user,setUser] = useContext(UserContext);
    const history = useHistory();
    
    function handleSubmit(data){
        if(data){
            if(data.username === 'xomrayno1'){
                setUser({
                    ...user,
                    username : data.username,
                    password : data.password,
                    loggedIn : true
                })
                history.replace("/students")
            }
        }else{
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
                    onSubmit={handleSubmit}
                    validationSchema= {
                        Yup.object({
                            username: Yup.string()
                                .required("Input is required!")
                                .min(3,"Username must be at least 3 characters")
                                .max(15,"Username must be at most 15 characters")
                                .trim(),
                            password: Yup.string()
                                .required("Input is required!")
                                .min(3,"Password must be at least 3 characters")
                                .max(15,"Password must be at most 15 characters")
                                .trim()
                        })
                    }
                > 
                    <Form>
                        <div>
                            <label htmlFor="username">Username : </label>
                            <Field   name="username"   className="form-control"/>
                                <ErrorMessage name="username"  />
                        </div>
                        <div>
                            <label htmlFor="password">Password : </label>
                            <Field  name="password" type="password" className="form-control"/>
                                <ErrorMessage name="password"  />
                        </div>
                        <Button color="primary"  type="submit">Login</Button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}

export default Login;