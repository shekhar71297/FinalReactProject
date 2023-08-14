import {combineReducers} from 'redux'
import resultreducer from '../pages/result/Reducer';
import StudentReducer from '../pages/student/reducer'; 
import voucherReducer from '../pages/result/Reducer'


const rootReducer = combineReducers({
        resultStore:resultreducer ,
        voucherStore:voucherReducer,
        studentStore:StudentReducer

// const rootReducer = combineReducers({
        
        
    });
    

export default rootReducer;