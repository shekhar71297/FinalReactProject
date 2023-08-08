import {combineReducers} from 'redux'
import userReducer from '../pages/user/reducer'; 

const rootReducer = combineReducers({
        userStore:userReducer ,
        
    });
    

export default rootReducer;