import {ADD_STUDENT,DELETE_STUDENT,UPDATE_STUDENT,SET_STUDENT} from '../../common/Constant'

const initalState = {
    students: []
}
function StudentReducer(state = initalState , action){
    const {type, payload} = action;
    switch(type){
        case SET_STUDENT:
            state.students = payload;
            return state;
        default:
            return state;
    }
}
export default StudentReducer;