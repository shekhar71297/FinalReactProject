import {combineReducers} from 'redux'
import resultreducer from '../pages/result/Reducer'; 
// import StudentReducer from '../pages/student/Reducer'; 
import questionreducer from '../pages/question/Reducer';
const rootReducer = combineReducers({
        resultStore:resultreducer ,
        questionStore: questionreducer

// const rootReducer = combineReducers({
        
        
    });
    

    export default rootReducer;