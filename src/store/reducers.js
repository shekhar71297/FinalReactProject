import {combineReducers} from 'redux'
import resultreducer from '../pages/result/Reducer'; 
import VoucherReducer from '../pages/voucher/Reducer'


const rootReducer = combineReducers({
        resultStore:resultreducer ,
       voucherStore:VoucherReducer


        
        
    });
    

export default rootReducer;