import {takeLatest,put,call} from 'redux-saga/effects'
import courseApi from '../../api/courseApi'
import {defaultFilter} from '../../common/utils'
import {
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
 
 
} from '../../common/Constant'
import {message} from 'antd'


function* fetchCourse({payload}){
    try {
        const response = yield  call(courseApi.getAll, payload);
        yield put({type : RECEIVE_COURSE_SUCCESS, payload :  response});
    } catch (error) {
        yield put({type : RECEIVE_COURSE_FAILED, payload : error.message})
    }
}
function* addCourse({payload, formCourseRef,onCloseDialog}){
    try {
        const data = yield call(courseApi.create,payload);
        const response = yield  call(courseApi.getAll, {...defaultFilter});
        yield put({type: ADD_COURSE_SUCCESS, payload: response});
        message.success(data.message)
        onCloseDialog()
    } catch (error) {
        validateError(error, formCourseRef)
        yield put({type: ADD_COURSE_FAILED, payload: error.message});
    }
}
function* updateCourse({payload, formCourseRef, onCloseDialog}){
    try {
        const data = yield call(courseApi.update,payload);
        const response = yield  call(courseApi.getAll, {...defaultFilter});
        yield put({type: UPDATE_COURSE_SUCCESS, payload: response});
        onCloseDialog && onCloseDialog();
        message.success(data.message)
    } catch (error) {
        
        validateError(error, formCourseRef)
        yield put({type: UPDATE_COURSE_FAILED, payload: error.message});
    }
}

function validateError( error, formRef){
    const status = error.response.data.status;
    switch(status){
        case 400:
            formRef.current.setErrors({
                ...error.response.data.fieldErrors
            })
            break;
        case 409:
            formRef.current.setErrors({
                code : error.response.data.message
            })
            break;
        default: 
            console.log("error");
            break;
    }
}
function* deleteCourse({payload}){
    try {
        const data = yield call(courseApi.deleteById,payload);
        const response = yield  call(courseApi.getAll, {...defaultFilter});
        yield put({type: DELETE_COURSE_SUCCESS, payload: response});
        message.success(data.message)
    } catch (error) {
        yield put({type: DELETE_COURSE_FAILED, payload: error.message});
    }
}
//worker


export default function* courseSaga(){ //watcher
   yield takeLatest(GET_COURSES_REQUEST, fetchCourse)
   yield takeLatest(ADD_COURSE, addCourse)
   yield takeLatest(UPDATE_COURSE, updateCourse)
   yield takeLatest(DELETE_COURSE, deleteCourse)
}