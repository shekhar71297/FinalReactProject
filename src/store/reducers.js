import {combineReducers} from 'redux'
import resultreducer from '../pages/result/Reducer';
import StudentReducer from '../pages/student/reducer';  
import userReducer from '../pages/user/reducer'; 
import questionreducer from '../pages/question/reducer';
import VoucherReducer from '../pages/voucher/Reducer';
const rootReducer = combineReducers({
        userStore:userReducer ,
        resultStore:resultreducer ,
        VoucherStore:VoucherReducer,
        studentStore:StudentReducer,
        questionStore: questionreducer,
        
               
    });
    

    export default rootReducer;