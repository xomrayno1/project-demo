import {
    ADD_EVENT,
    EDIT_EVENT
} from '../../common/Constant'
const initalState = {
    isAdd : false,
    isEdit: ''
}
export default function appReducer(state = initalState, action){
    const {type, payload} = action;
    switch(type){
        case ADD_EVENT:
            return {
                ...state,
                isAdd : payload
            }
 
        default:
            return state;
    }
}