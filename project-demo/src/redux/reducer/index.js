import {combineReducers} from 'redux'
import studentReducer from './student/studentReducer'
import courseReducer from './course/CourseReducer'
import FormReducer from './course/FormCourse'
import appReducer from './appReducer'
 

const rootReducer = combineReducers({
    student : studentReducer,
    app: appReducer,
    course : courseReducer,
    formCourse : FormReducer
})
 

export default rootReducer;