import {SET_FORM_COURSE } from '../../common/Constant'
const initalValue = {
    visible: false,
    form: {
        id: '',
        name: '',
        code: '',
        description: ''
    }
}
function FormCourse(state = initalValue, action){
    const {type, payload} = action
    switch(type){
        case SET_FORM_COURSE:
            state = payload;
            return state;
        default:
            return state;
    }
}
export default FormCourse;