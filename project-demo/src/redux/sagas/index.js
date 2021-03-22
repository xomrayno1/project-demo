import { all } from "@redux-saga/core/effects";
import studentSaga from '../sagas/studentSaga'

export default function* rootSaga(){
    yield all([
        studentSaga()
    ])
}