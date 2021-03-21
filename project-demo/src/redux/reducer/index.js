import {combineReducers} from 'redux'
import studentReducer from './student/studentReducer'
import CourseReducer from './course/CourseReducer'
import FormReducer from './course/FormCourse'
 
 

const rootReducer = combineReducers({
    student : studentReducer,
    courseReducer : CourseReducer,
    formCourse : FormReducer
})
 

export default rootReducer;