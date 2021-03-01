import React from 'react';
import PropTypes from 'prop-types';

Footer.propTypes = {
    
};

function Footer(props) {
    return (
        <footer class="bg-light text-center text-lg-start">
            <div class="text-center p-3" >
                © 2020 Copyright:
                <a class="text-dark" href="/"> NCT</a>
            </div>
        </footer>
    );
}

export default Footer;