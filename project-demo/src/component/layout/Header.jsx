import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {
    Link
  } from "react-router-dom";

import UserContext from '../../common/UseContext'  
Header.propTypes = {
    
};

function Header(props) {
    const [user,setUser] = useContext(UserContext);

    function handleLogOut(){
        setUser({username : '',password:'', hasShowError:  false ,loggedIn: false});
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Project Demo</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                   {user.loggedIn && <Link className="nav-item nav-link" to="/students" >Student</Link>}
                   {user.loggedIn && <Link className="nav-item nav-link" to="/courses" >Courses</Link>}
                </div>
                <div className="navbar-nav navbar-collapse justify-content-end">
                    {user.loggedIn && <Link onClick={handleLogOut} className="nav-link" to="/login" >Logout</Link> }
                    {!user.loggedIn && <Link className="nav-link" to="/login"> Login</Link>}
                </div>
            </div>
             
        </nav>
    );
}

export default Header;