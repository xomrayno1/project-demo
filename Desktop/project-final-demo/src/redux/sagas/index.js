import { all } from "@redux-saga/core/effects";
import studentSaga from '../sagas/studentSaga'
import courseSaga from '../sagas/courseSaga'
export default function* rootSaga(){
    yield all([
        studentSaga(),
        courseSaga()
    ])
}