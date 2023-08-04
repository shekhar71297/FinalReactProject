import {combineReducers} from 'redux'
import resultreducer from '../pages/result/Reducer'; 

const rootReducer = combineReducers({
        resultStore:resultreducer ,
        
    });
    

export default rootReducer;