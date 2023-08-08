import {combineReducers} from 'redux'
import StudentReducer from '../pages/student/reducer'; 

const rootReducer = combineReducers({
        StudentStore:StudentReducer ,
        
    });
    

export default rootReducer;