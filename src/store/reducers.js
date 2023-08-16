import {combineReducers} from 'redux'
import resultreducer from '../pages/result/Reducer';
import StudentReducer from '../pages/student/reducer'; 
import voucherReducer from '../pages/result/Reducer'


import resultreducer from '../pages/result/Reducer'; 
import userReducer from '../pages/user/reducer'; 
import voucherReducer from '../pages/result/Reducer'
import questionreducer from '../pages/question/Reducer';
const rootReducer = combineReducers({
        userStore:userReducer ,
        resultStore:resultreducer ,
        voucherStore:voucherReducer,
        studentStore:StudentReducer,

// const rootReducer = combineReducers({
        
        
        questionStore: questionreducer,
        voucherStore:voucherReducer        
    });
    

    export default rootReducer;