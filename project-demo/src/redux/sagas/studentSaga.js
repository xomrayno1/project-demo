import {put,call,takeEvery} from 'redux-saga/effects'
import {
    GET_STUDENTS_REQUEST,
    GET_STUDENT_DETAIL_REQUEST,
    RECEIVE_STUDENT_SUCCESS,
    RECEIVE_STUDENT_FAILED,
    DELETE_STUDENT,
    DELETE_STUDENT_FAILED,
    DELETE_STUDENT_SUCCESS,
    ADD_STUDENT,
    UPDATE_STUDENT,
    UPDATE_STUDENT_SUCCESS,
    UPDATE_STUDENT_FAILED,
    ADD_STUDENT_FAILED,
    ADD_STUDENT_SUCCESS
} from '../../common/Constant'
import studentApi from '../../api/studentApi'
import { defaultFilter } from '../../common/utils'

function* fetchStudent({payload}){
    try {
        const response = yield call(studentApi.getAll,payload)
        yield put({type : RECEIVE_STUDENT_SUCCESS , payload : response})
    } catch (error) {
        yield put({type: RECEIVE_STUDENT_FAILED, payload : error.response.data.message})
    }
}
function* fetchStudentDetail({payload}){
    try {
        const response = yield call(studentApi.getById,payload)
        yield put({type : RECEIVE_STUDENT_SUCCESS , payload : response})
    } catch (error) {
        yield put({type: RECEIVE_STUDENT_FAILED, payload : error.response.data.message})
    }
}
function* updateStudent({payload}){
    try {
        yield call(studentApi.update,payload);
        const response = yield call(studentApi.getAll,{...defaultFilter})
        yield put({type: UPDATE_STUDENT_SUCCESS, payload : response})
    } catch (error) {
        yield put({type: UPDATE_STUDENT_FAILED, payload : error.response.data.message})
    }

}
function* deleteStudent({payload}){
    try {
        yield call(studentApi.deleteByid,payload);
        const response = yield call(studentApi.getAll,{...defaultFilter})
        yield put({type: DELETE_STUDENT_SUCCESS, payload : response})
    } catch (error) {
        yield put({type: DELETE_STUDENT_FAILED, payload : error.response.data.message})
    }
}
function* addStudent({payload}){
    try {
        yield call(studentApi.create,payload);
        const response = yield call(studentApi.getAll,{...defaultFilter})
        yield put({type: ADD_STUDENT_SUCCESS, payload : response})
    } catch (error) {
        yield put({type: ADD_STUDENT_FAILED, payload : error.response.data.message})
    }
}

export default function* studentSaga(){
    yield takeEvery(GET_STUDENTS_REQUEST,fetchStudent);
    yield takeEvery(DELETE_STUDENT,deleteStudent);
    yield takeEvery(ADD_STUDENT,addStudent);
    yield takeEvery(UPDATE_STUDENT,updateStudent);
    yield takeEvery(GET_STUDENT_DETAIL_REQUEST,fetchStudentDetail)
}