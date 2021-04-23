import {
        GET_STUDENTS_REQUEST,
        ADD_STUDENT,
        UPDATE_STUDENT,
        DELETE_STUDENT,
        ADD_ROW_STUDENT,
        GET_STUDENT_DETAIL_REQUEST,
        UPDATE_ENROL_STUDENT
    }
    from '../../common/Constant'

export const fetchStudentRequest = (data) => {
    return {
        type : GET_STUDENTS_REQUEST,
        payload : data 
    }
}
export const addStudent = (data, form) => {
    return {
        type : ADD_STUDENT,
        payload : data,
        form
    }
}
export const deleteStudent = (data) => {
    return {
        type : DELETE_STUDENT,
        payload : data
    }
}
export const updateStudent = (data, form) => {
    return {
        type : UPDATE_STUDENT,
        payload : data,
        form
    }
}
export const updateEnrol = (data) => {
    return {
        type : UPDATE_ENROL_STUDENT,
        payload : data,
    }
}
export const addRowStudent = (data) => {
    return {
        type : ADD_ROW_STUDENT,
        payload : data
    }
}
export const fetchStudentDetail = (data) => {
    return {
        type : GET_STUDENT_DETAIL_REQUEST,
        payload : data
    }
}
 