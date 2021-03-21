import { SET_COURSE } from '../../../common/Constant'

const initalState = {
    course: [],
}
function CourseReducer(state = initalState, action){
    const {type, payload} = action;
    switch(type){
        case SET_COURSE : 
            state.course = payload;
        default :
            return state;
    }
}
export default CourseReducer;