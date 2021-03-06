import {
        SET_STUDENT
        ,SET_FORM_STUDENT,
        SET_COURSE,
        SET_FORM_COURSE}
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

export const setCourse = (data) =>{
    return {
        type : SET_COURSE,
        payload : data
    }
}
export const setFormCourse = (data) =>{
    return {
        type : SET_FORM_COURSE,
        payload : data
    }
}