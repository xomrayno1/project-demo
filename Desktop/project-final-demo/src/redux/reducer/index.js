import {combineReducers} from 'redux'
import studentReducer from './student/studentReducer'
import courseReducer from './course/CourseReducer'
import appReducer from './appReducer'
 

const rootReducer = combineReducers({
    student : studentReducer,
    app: appReducer,
    course : courseReducer,
    
})
 

export default rootReducer;