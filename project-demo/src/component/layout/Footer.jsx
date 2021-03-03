import React from 'react';
import PropTypes from 'prop-types';

Footer.propTypes = {
    
};

function Footer(props) {
    return (
        <footer className="bg-light text-center text-lg-start">
            <div className="text-center p-3" >
                © 2020 Copyright:
                <a className="text-dark" href="/"> NCT</a>
            </div>
        </footer>
    );
}

export default Footer;