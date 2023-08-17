import {combineReducers} from 'redux'
import resultreducer from '../pages/result/Reducer'; 
import VoucherReducer from '../pages/voucher/Reducer'
import userReducer from '../pages/user/reducer'; 
import questionreducer from '../pages/question/Reducer';
const rootReducer = combineReducers({
        userStore:userReducer ,
        resultStore:resultreducer ,
       voucherStore:VoucherReducer,
       questionStore: questionreducer,
          
    });
    

    export default rootReducer;