import { combineReducers } from 'redux';
import feedbackReducer from '../pages/feedback/Reducer';


const rootReducer = combineReducers({
   feedbackStore:feedbackReducer
});

export default rootReducer;