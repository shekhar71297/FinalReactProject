import {combineReducers} from 'redux'
import resultreducer from '../pages/result/Reducer'; 
import userReducer from '../pages/user/reducer'; 
import voucherReducer from '../pages/result/Reducer'
// import StudentReducer from '../pages/student/Reducer'; 

const rootReducer = combineReducers({
        userStore:userReducer ,
        resultStore:resultreducer ,
        voucherStore:voucherReducer


});
    

export default rootReducer;