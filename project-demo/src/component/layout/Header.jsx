import React from 'react';
import PropTypes from 'prop-types';
import {
    Link
  } from "react-router-dom";
Header.propTypes = {
    
};

function Header(props) {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="/">Project Demo</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <Link class="nav-item nav-link" to="/students" >Student</Link>
                    <Link class="nav-item nav-link" to="/courses" >Courses</Link>
                </div>
            </div>
        </nav>
    );
}

export default Header;