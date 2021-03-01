import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap'

StudentList.propTypes = {
    
};

function StudentList(props) {
    return (
        <div className="container">
            <h1>Student List</h1>
            <Button color="success"   outline style={{marginBottom : '10px'}} > Add</Button>
            <table class="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default StudentList;