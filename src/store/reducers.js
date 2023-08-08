import {combineReducers} from 'redux'
import resultreducer from '../pages/result/Reducer'; 
// import StudentReducer from '../pages/student/Reducer'; 

const rootReducer = combineReducers({
        resultStore:resultreducer ,

// const rootReducer = combineReducers({
        
        
    });
    

export default rootReducer;