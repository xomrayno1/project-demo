import React from 'react';
import PropTypes from 'prop-types';
import {
    Link
  } from "react-router-dom";
Header.propTypes = {
    
};

function Header(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">Project Demo</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link className="nav-item nav-link" to="/students" >Student</Link>
                    <Link className="nav-item nav-link" to="/courses" >Courses</Link>
                </div>
            </div>
        </nav>
    );
}

export default Header;