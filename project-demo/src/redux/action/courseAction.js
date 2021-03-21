import {
    
    SET_COURSE,
    SET_FORM_COURSE}
    from '../../common/Constant'

 

 

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