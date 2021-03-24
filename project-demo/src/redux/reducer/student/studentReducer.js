import {
    GET_STUDENTS_REQUEST,
    RECEIVE_STUDENT_SUCCESS,
    RECEIVE_STUDENT_FAILED,
    ADD_STUDENT,
    ADD_STUDENT_FAILED,
    ADD_STUDENT_SUCCESS,
    DELETE_STUDENT,
    DELETE_STUDENT_FAILED,
    DELETE_STUDENT_SUCCESS,
    UPDATE_STUDENT,
    UPDATE_STUDENT_FAILED,
    UPDATE_STUDENT_SUCCESS,
    ADD_ROW_STUDENT,
    GET_STUDENT_DETAIL_REQUEST,
 
    }
    from '../../../common/Constant'

const initalState = {
    students: {},
    isLoading: false,
    error : '',
    
}
function studentReducer(state = initalState , action){
    const {type, payload} = action;
    switch(type){
        case GET_STUDENTS_REQUEST:            
            return {
                ...state,
                isLoading : true
            }
        case GET_STUDENT_DETAIL_REQUEST:
            return {
                ...state,
                isLoading : true
            } 
        case ADD_STUDENT:            
            return {
                ...state,
                isLoading : true
            }
        case ADD_STUDENT_SUCCESS:            
            return {
                ...state,
                isLoading : false,
                students : payload, 
            }
        case ADD_STUDENT_FAILED:            
            return {
                ...state,
                isLoading : false,
                error : payload
            }
        case DELETE_STUDENT:            
            return {
                ...state,
                isLoading : true,
            }
        case DELETE_STUDENT_FAILED:            
            return {
                ...state,
                isLoading : false,
                error : payload
            }
        case DELETE_STUDENT_SUCCESS:            
            return {
                ...state,
                isLoading : false,
                students: payload
            }
        case UPDATE_STUDENT:            
            return {
                ...state,
                isLoading : true
            }
 
        case UPDATE_STUDENT_FAILED:            
            return {
                ...state,
                isLoading : false,
                error : payload
            }
        case UPDATE_STUDENT_SUCCESS:            
            return {
                ...state,
                isLoading : false,
                students : payload
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
        case ADD_ROW_STUDENT:            
            return {
                ...state,
                students : {
                    ...state.students,
                   data : [payload,...state.students.data]
                }
            }
        default:
            return state;
    }
}
export default studentReducer;