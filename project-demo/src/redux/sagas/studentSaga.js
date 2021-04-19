import {put,call,takeEvery, takeLatest} from 'redux-saga/effects'
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
    ADD_STUDENT_SUCCESS,
    UPDATE_ENROL_STUDENT,
    UPDATE_ENROL_STUDENT_SUCCESS,
    UPDATE_ENROL_STUDENT_FAILED,
    GET_STUDENT_DETAIL_REQUEST_FAILED,
    GET_STUDENT_DETAIL_REQUEST_SUCCESS
} from '../../common/Constant'
import studentApi from '../../api/studentApi'
import { defaultFilter } from '../../common/utils'
import {message} from 'antd'


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
        yield put({type : GET_STUDENT_DETAIL_REQUEST_SUCCESS , payload : response})
    } catch (error) {
        yield put({type: GET_STUDENT_DETAIL_REQUEST_FAILED, payload : error.response.data.message})
    }
}
function* updateStudent({payload, form}){
    console.log(form);
    try {
        const data = yield call(studentApi.update,payload);
        message.success(data.message)
        const response = yield call(studentApi.getAll,{...defaultFilter})
        yield put({type: UPDATE_STUDENT_SUCCESS, payload : response})
    } catch (error) {
        const status = error.response.data.status;
        switch(status){
            case 409:
                message.error(error.response.data.message);
                break;
            default : 
                message.error("Update failed");
        }

        yield put({type: UPDATE_STUDENT_FAILED, payload : error.response.data.message})
    }

}
function* deleteStudent({payload}){
    try {
        const data = yield call(studentApi.deleteByid,payload);
        
        message.success(data.message)
        const response = yield call(studentApi.getAll,{...defaultFilter})
        yield put({type: DELETE_STUDENT_SUCCESS, payload : response})
    } catch (error) {
        yield put({type: DELETE_STUDENT_FAILED, payload : error.response.data.message})
    }
}
function* addStudent({payload}){
    try {
        const data = yield call(studentApi.create,payload);
     
        const response = yield call(studentApi.getAll,{...defaultFilter})
        yield put({type: ADD_STUDENT_SUCCESS, payload : response})
        message.success(data.message)
    } catch (error) {
        yield put({type: ADD_STUDENT_FAILED, payload : error.response.data.message})
    }
}
function* updateEnrol({payload}){
    try {
        yield call(studentApi.updateEnrol,payload);
        const response = yield call(studentApi.getAll,{...defaultFilter})
        yield put({type: UPDATE_ENROL_STUDENT_SUCCESS, payload : response})
    } catch (error) {
        yield put({type: UPDATE_ENROL_STUDENT_FAILED, payload : error.response.data.message})
    }

}
export default function* studentSaga(){
    yield takeLatest(GET_STUDENTS_REQUEST,fetchStudent);
    yield takeLatest(DELETE_STUDENT,deleteStudent);
    yield takeLatest(ADD_STUDENT,addStudent);
    yield takeLatest(UPDATE_STUDENT,updateStudent);
    yield takeLatest(GET_STUDENT_DETAIL_REQUEST,fetchStudentDetail)
    yield takeLatest(UPDATE_ENROL_STUDENT, updateEnrol)
}