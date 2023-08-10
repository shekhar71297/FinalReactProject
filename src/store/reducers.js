import {combineReducers} from 'redux'
import resultreducer from '../pages/result/Reducer'; 
import StudentReducer from '../pages/student/reducer'; 

const rootReducer = combineReducers({
        resultStore:resultreducer ,
        studentStore:StudentReducer

// const rootReducer = combineReducers({
        
        
    });
    

export default rootReducer;