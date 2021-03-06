import {createStore,combineReducers} from 'redux'
import StudentReducer from './student/StudentReducer'
import FormStudentReducer from './student/FormStudentReducer'
import CourseReducer from './course/CourseReducer'
import FormReducer from './course/FormCourse'
const reducer = combineReducers({
    studentReducer : StudentReducer,
    formStudent : FormStudentReducer,
    courseReducer : CourseReducer,
    formCourse : FormReducer
})
const store = createStore(reducer);

export default store;