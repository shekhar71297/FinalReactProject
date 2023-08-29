import * as constant from './constant.js'

export const initialState = {
    allFeedback: [],
    feedBack: {},
    error: null,
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

        case constant.UPDATE_FEEDBACK_SUCCESS:{
            const draft = state;
            const index = draft.allFeedback.findIndex((d)=>d.id===action.payload.id) || -1
            draft.allFeedback[index]=action.payload
            return draft;
            
        }

        case constant.DELETE_FEEDBACK_SUCCESS:{
            let allFeedback = state.allFeedback.filter((d)=>d.id!==action.payload)
            return {...state,allFeedback:allFeedback};
            
        }

        case constant.GET_SINGLE_FEEDBACK:{
            const index =state.allFeedback.findIndex((d)=>d.id===action.payload);
            const feedBack=state.allFeedback[index];
            return{...state,feedBack:feedBack};
            
        }

        default:
            return state
            
    }
}