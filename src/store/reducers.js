import {combineReducers} from 'redux'
import StudentReducer from '../pages/student/Reducer'; 

const rootReducer = combineReducers({
        StudentStore:StudentReducer ,
        
    });
    

export default rootReducer;