import {combineReducers} from 'redux'
import studentReducer from './student/studentReducer'
import CourseReducer from './course/CourseReducer'
import FormReducer from './course/FormCourse'
import appReducer from './appReducer'
 

const rootReducer = combineReducers({
    student : studentReducer,
    app: appReducer,
    courseReducer : CourseReducer,
    formCourse : FormReducer
})
 

export default rootReducer;