import {combineReducers} from 'redux'
import userReducer from '../pages/user/reducer'; 
import StudentReducer from '../pages/student/Reducer'; 
const rootReducer = combineReducers({
        userStore:userReducer ,
        StudentStore:StudentReducer 


})

export default rootReducer;