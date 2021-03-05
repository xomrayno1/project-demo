import {ADD_STUDENT,
        DELETE_STUDENT,
        UPDATE_STUDENT,
        SET_STUDENT
        ,SET_FORM_STUDENT}
        from '../common/Constant'

export const setStudent = (data) => {
    return {
        type : SET_STUDENT,
        payload : data 
    }
}

export const setFormStudent = (data) => {
    return {
        type : SET_FORM_STUDENT,
        payload : data 
    }
}