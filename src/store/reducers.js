import {combineReducers} from 'redux'
import resultreducer from '../pages/result/Reducer'; 
import feedbackReducer from '../pages/feedback/Reducer';
import voucherReducer from '../pages/result/Reducer'
// import StudentReducer from '../pages/student/Reducer'; 

const rootReducer = combineReducers({
        resultStore:resultreducer ,
        voucherStore:voucherReducer,
        feedbackStore:feedbackReducer

// const rootReducer = combineReducers({
        
        
    });
    

export default rootReducer;