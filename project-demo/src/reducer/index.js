import {createStore,combineReducers} from 'redux'
import StudentReducer from './StudentReducer'
import FormStudentReducer from './FormStudentReducer'

const reducer = combineReducers({
    studentReducer : StudentReducer,
    formStudent : FormStudentReducer
})
const store = createStore(reducer);

export default store;