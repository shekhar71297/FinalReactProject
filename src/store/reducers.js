import {combineReducers} from 'redux'
import resultreducer from '../pages/result/Reducer'; 
import voucherReducer from '../pages/result/Reducer';
import questionreducer from '../pages/question/Reducer';
const rootReducer = combineReducers({
        resultStore:resultreducer ,
        questionStore: questionreducer,
        voucherStore:voucherReducer        
    });
    

    export default rootReducer;