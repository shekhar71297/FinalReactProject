import {combineReducers} from 'redux'
import resultreducer from '../pages/result/Reducer'; 
import voucherReducer from '../pages/result/Reducer'
// import StudentReducer from '../pages/student/Reducer'; 

const rootReducer = combineReducers({
        resultStore:resultreducer ,
        voucherStore:voucherReducer

// const rootReducer = combineReducers({
        
        
    });
    

export default rootReducer;