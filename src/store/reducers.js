import {combineReducers} from 'redux'
<<<<<<< HEAD
import userReducer from '../pages/user/reducer'; 
import StudentReducer from '../pages/student/Reducer'; 
const rootReducer = combineReducers({
        userStore:userReducer ,
        StudentStore:StudentReducer 


})
=======
import resultreducer from '../pages/result/Reducer'; 
// import StudentReducer from '../pages/student/Reducer'; 

const rootReducer = combineReducers({
        resultStore:resultreducer ,

// const rootReducer = combineReducers({
        
        
    });
    
>>>>>>> 7e807c79e632fde29a50bf01c00808fd0763856c

export default rootReducer;