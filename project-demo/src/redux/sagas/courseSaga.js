import {takeEvery,put,call} from 'redux-saga/effects'
import courseApi from '../../api/courseApi'
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

function* fetchCourse({payload}){
    try {
        const response = yield  call(courseApi.getAll, payload);
        yield put({type : RECEIVE_COURSE_SUCCESS, payload :  response});
    } catch (error) {
        yield put({type : RECEIVE_COURSE_FAILED, payload : error.message})
    }
}

//worker


export default function* courseSaga(){ //watcher
   yield takeEvery(GET_COURSES_REQUEST, fetchCourse)
}