import {put,call,takeEvery} from 'redux-saga/effects'
import {
    GET_STUDENTS_REQUEST,
    RECEIVE_STUDENT_SUCCESS,
    RECEIVE_STUDENT_FAILED
} from '../../common/Constant'
import studentApi from '../../api/studentApi'


function* fetchStudent({payload}){
    try {
        const response = yield call(studentApi.getAll,payload)
        yield put({type : RECEIVE_STUDENT_SUCCESS , payload : response})
    } catch (error) {
        yield put({type: RECEIVE_STUDENT_FAILED, payload : error.message})
    }
}

export default function* studentSaga(){
    yield takeEvery(GET_STUDENTS_REQUEST,fetchStudent);
}