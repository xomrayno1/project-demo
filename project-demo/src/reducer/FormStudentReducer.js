import { SET_FORM_STUDENT } from '../common/Constant'

const initalState = {
    visible : false,
    form: {
        id: '',
        name: '',
        code: '',
        email: '',
        address: ''
    }
}
function FormStudentReducer(state = initalState , action){
    const {type, payload} = action;
    switch(type){
        case SET_FORM_STUDENT:
            state  = payload;
            return  state;
        default:
            return state;
    }
}
export default FormStudentReducer;