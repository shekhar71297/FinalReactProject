import { combineReducers } from 'redux';
import feedbackReducer from '../pages/feedback/Reducer';
import resultreducer from '../pages/result/Reducer'; 
const rootReducer = combineReducers({
   feedbackStore:feedbackReducer,
   resultStore:resultreducer,
});

export default rootReducer;