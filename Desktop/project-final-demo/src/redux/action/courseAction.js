import {

    SET_COURSE,
    SET_FORM_COURSE,
    GET_COURSES_REQUEST,
    DELETE_COURSE,
    UPDATE_COURSE,
    ADD_COURSE,
}
    from '../../common/Constant'



export const fetchCourseRequest = (data) => {
    return {
        type: GET_COURSES_REQUEST,
        payload: data
    }
}
export const addCourse = (data, formCourseRef, onCloseDialog) => {
    return {
        type: ADD_COURSE,
        payload: data,
        formCourseRef,
        onCloseDialog
    }
}
export const deleteCourse = (data) => {
    return {
        type: DELETE_COURSE,
        payload: data
    }
}
export const updateCourse = (data, formCourseRef, onCloseDialog) => {
    return {
        type: UPDATE_COURSE,
        payload: data,
        formCourseRef,
        onCloseDialog
    }
}



export const setCourse = (data) => {
    return {
        type: SET_COURSE,
        payload: data
    }
}
export const setFormCourse = (data) => {
    return {
        type: SET_FORM_COURSE,
        payload: data
    }
}

