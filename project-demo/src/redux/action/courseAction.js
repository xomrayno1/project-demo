import {
    
    SET_COURSE,
    SET_FORM_COURSE,
    GET_COURSES_REQUEST,
    RECEIVE_COURSE_SUCCESS,
    RECEIVE_COURSE_FAILED,
    DELETE_COURSE_SUCCESS,
    DELETE_COURSE_FAILED,
    DELETE_COURSE,
    UPDATE_COURSE_SUCCESS,
    UPDATE_COURSE_FAILED,
    UPDATE_COURSE,
    ADD_COURSE_FAILED,
    ADD_COURSE_SUCCESS,
    ADD_COURSE,
}
    from '../../common/Constant'

 

    export const fetchCourseRequest = (data) => {
        return {
            type : GET_COURSES_REQUEST,
            payload : data 
        }
    }
    export const addCourse = (data) => {
        return {
            type : ADD_COURSE,
            payload : data
        }
    }
    export const deleteCourse = (data) => {
        return {
            type : DELETE_COURSE,
            payload : data
        }
    }
    export const updateCourse = (data) => {
        return {
            type : UPDATE_COURSE,
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

