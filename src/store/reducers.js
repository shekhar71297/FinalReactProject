import {combineReducers} from 'redux'
import resultreducer from '../pages/result/Reducer'; 
import userReducer from '../pages/user/reducer'; 
const rootReducer = combineReducers({
        userStore:userReducer ,
        resultStore:resultreducer ,


});
    

export default rootReducer;