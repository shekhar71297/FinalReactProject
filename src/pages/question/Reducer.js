import *  as constant from './actiontype'

export const initialState = {
    allquestions: [],
    questions: {},
    error: null
}

export default function questionreducer(state = initialState, action) {
    switch (action.type) {
        case constant.GET_QUESTION_SUCCESS: {

            return { ...state, questions: {}, allquestions: action.payload };
        }
        
        case constant.GET_QUESTION_ERROR,
            constant.DELETE_QUESTION_ERROR: {

                return { ...state, questions: {}, error: action.payload };

            }

        // add question 
        
        case constant.ADD_QUESTION_SUCCESS: {
            let allquestions = state.allquestions.filter((d) => d.id !== action.payload)
            return { ...state, allquestions: allquestions };
        }

        // put question 

        case constant.UPDATE_QUESTION_SUCCESS: {
            let allquestions = state.allquestions.filter((d) => d.id !== action.payload)
            return { ...state, allquestions: allquestions };
        }
    
        // delete question

        case constant.DELETE_QUESTION_SUCCESS: {
            let allquestions = state.allquestions.filter((d) => d.id !== action.payload)
            return { ...state, allquestions: allquestions };
        }

        
        // Edit Question

        case constant.GET_SINGLE_QUESTION: {
            const index = state.allquestions.findIndex(d => d.id === action.payload );
            const question =state.allquestions[index];
            return {...state,questions:question}
        }

        default:
            return state;
    }
}