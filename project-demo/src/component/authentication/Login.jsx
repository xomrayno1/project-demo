import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { Button,Alert } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'rc-dialog/assets/bootstrap.css';
import { useForm } from 'react-hook-form';
import UserContext  from '../../common/UseContext'
import {  useHistory } from 'react-router-dom';

Login.propTypes = {
    
};

function Login(props) {
    const {register,errors,handleSubmit} = useForm();
    
    const [user,setUser] = useContext(UserContext);
    const history = useHistory();

    function handleLogin(data){
        if(data.username === 'xomrayno1'){
            setUser({username : data.username,
                    password : data.password,
                    loggedIn: true,
                    hasShowError: false })
            history.replace(`/students`)
        }else{
            setUser({...user, hasShowError: true})
        }
    }
    return (
        <div className="container">
            <div>
                <form onClick={handleSubmit(handleLogin)}>
                    {user.hasShowError && <Alert color="danger"  >Username or Password incorrect</Alert>}
                    <label htmlFor="username">Username : </label>
                    <input  type="text"  name="username" ref={register({required : true})}
                        placeholder="Username ....."  className="form-control"   />
                    {
                            errors.username && <Alert color="danger"  >Your input is required</Alert>
                    }
                    <label htmlFor="password">Password : </label>
                    <input  type="password"  name="password" ref={register({required : true})}
                        placeholder="Password ....."   className="form-control"    />
                    {
                        errors.password && <Alert color="danger"  >Your input is required</Alert>
                    }
                    <Button color="primary" type="submit">Login</Button>
                </form>
            </div>
        </div>
    );
}

export default Login;