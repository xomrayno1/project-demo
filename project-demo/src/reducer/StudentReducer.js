import {ADD_STUDENT,DELETE_STUDENT,UPDATE_STUDENT,SET_STUDENT} from '../common/Constant'

const initalState = {
    students: []
}
function StudentReducer(state = initalState , action){
    const {type, payload} = action;
    switch(type){
        case ADD_STUDENT:
            return state;
        case DELETE_STUDENT:
            return state;
        case UPDATE_STUDENT:
            return state;
        case SET_STUDENT:
            state.students = payload;
            return state;
        default:
            return state;
    }
}
export default StudentReducer;