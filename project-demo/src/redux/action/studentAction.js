import {
    GET_STUDENTS_REQUEST
    }
    from '../../common/Constant'

export const fetchStudentRequest = (data) => {
    return {
        type : GET_STUDENTS_REQUEST,
        payload : data 
    }
}

 