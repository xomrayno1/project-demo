import {
    GET_STUDENTS_REQUEST
    ,RECEIVE_STUDENT_SUCCESS,
    RECEIVE_STUDENT_FAILED
    }
    from '../../../common/Constant'

const initalState = {
    students: {},
    isLoading: false,
    error : ''
}
function studentReducer(state = initalState , action){
    const {type, payload} = action;
    switch(type){
        case GET_STUDENTS_REQUEST:            
            return {
                ...state,
                isLoading : true
            }
        case RECEIVE_STUDENT_SUCCESS:            
            return {
                ...state,
                students: payload,
                isLoading : false
            }
        case RECEIVE_STUDENT_FAILED:            
            return {
                ...state,
                isLoading : false,
                error : payload
            }
        default:
            return state;
    }
}
export default studentReducer;