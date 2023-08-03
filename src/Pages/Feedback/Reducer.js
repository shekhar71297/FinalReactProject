import * as constant from '../feedback/Constant'

export const initialState = {
    allFeedback: [],
    feedBack: {},
    error: null
}

export default function feedbackReducer(state = initialState, action) {
    switch (action.type) {
        case constant.GET_FEEDBACK_SUCCESS:{
            return { ...state, feedBack: {}, allFeedback: action.payload }
        }
           
        case constant.GET_FEEDBACK_ERROR,
            constant.ADD_FEEDBACK_ERROR:{
            return { ...state, feedBack: {}, error: action.payload };
            }

        case constant.ADD_FEEDBACK_SUCCESS:{
            let allFeedback = state.allFeedback;
            allFeedback.push(action.payload);
            return {...state,feedBack:{},allFeedback:allFeedback}; 
        }

        default:
            return state
            
    }
}