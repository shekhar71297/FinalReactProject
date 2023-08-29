import * as constant from './constant.js'

export const initialState = {
    allFeedback: [],
    feedBack: {},
    error: null,
    isFeedbackSuccessRes: false
}

export default function feedbackReducer(state = initialState, action) {
    switch (action.type) {
        case constant.GET_FEEDBACK_SUCCESS:{
            return { ...state, feedBack: {}, allFeedback: action.payload }
        }

        case constant.RESET_FEEDBACK_SUCCESS_RES:{
            return { ...state, isFeedbackSuccessRes:false }
        }
           
        case constant.GET_FEEDBACK_ERROR,
            constant.ADD_FEEDBACK_ERROR:{
            return { ...state, feedBack: {}, error: action.payload, isFeedbackSuccessRes:false };
            }

        case constant.ADD_FEEDBACK_SUCCESS:{
            let allFeedback = state.allFeedback;
            allFeedback.push(action.payload);
            return {...state,feedBack:{},allFeedback:allFeedback,isFeedbackSuccessRes:true}; 
        }

        default:
            return state
            
    }
}