import { 
    SET_COURSE,
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
 } from '../../../common/Constant'

const initalState = {
    courses: [],
    isLoading : false,
    error : ''
}
function courseReducer(state = initalState, action){
    const {type, payload} = action;
    switch(type){
        case SET_COURSE: 
            state.course = payload;
        case GET_COURSES_REQUEST:
            return {
                ...state,
                isLoading : true
            }
        case RECEIVE_COURSE_SUCCESS:
            return {
                ...state,
                courses : payload,
                isLoading : false
            }
        case RECEIVE_COURSE_FAILED:
            return {
                ...state,
                isLoading: false,
                error : payload
            }
        case ADD_COURSE:
            return {
                ...state,
                isLoading : true
            }
        case ADD_COURSE_SUCCESS:
            return {
                ...state,
                courses : payload,
                isLoading : false
            }
        case ADD_COURSE_FAILED:
            return {
                ...state,
                isLoading: false,
                error : payload
            }
        case DELETE_COURSE:
            return {
                ...state,
                isLoading : true
            }
        case DELETE_COURSE_SUCCESS:
            return {
                ...state,
                courses : payload,
                isLoading : false
            }
        case DELETE_COURSE_FAILED:
            return {
                ...state,
                isLoading: false,
                error : payload
            }
        case UPDATE_COURSE:
            return {
                ...state,
                isLoading : true
            }
        case UPDATE_COURSE_SUCCESS:
            return {
                ...state,
                courses : payload,
                isLoading : false
            }
        case UPDATE_COURSE_FAILED:
            return {
                ...state,
                isLoading: false,
                error : payload
            }
        default :
            return state;
    }
}
export default courseReducer;