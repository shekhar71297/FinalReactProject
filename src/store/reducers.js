import {combineReducers} from 'redux'
import resultreducer from '../pages/result/Reducer'; 
import userReducer from '../pages/user/reducer'; 
import voucherReducer from '../pages/result/Reducer'
import questionreducer from '../pages/question/Reducer';
const rootReducer = combineReducers({
        userStore:userReducer ,
        resultStore:resultreducer ,
        questionStore: questionreducer,
        voucherStore:voucherReducer        
    });
    

    export default rootReducer;