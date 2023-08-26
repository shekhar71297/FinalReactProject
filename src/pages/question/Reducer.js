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
        
        // case constant.ADD_QUESTION_SUCCESS: {
        //     let allquestions = state.allquestions.filter((d) => d.id !== action.payload)
        //     return { ...state, allquestions: allquestions,newQuestion };
        // }
        case constant.ADD_QUESTION_SUCCESS: {
            const newQuestion = action.payload;
            return { ...state, allquestions: [...state.allquestions, newQuestion] };
          }

        // put question 

        // case constant.UPDATE_QUESTION_SUCCESS: {
        //     let allquestions = state.allquestions.filter((d) => d.id !== action.payload)
        //     return { ...state, allquestions: state.allquestions.map((q) =>
        //         q.id === updatedQuestion.id ? updatedQuestion : q), };
        // }
        case constant.UPDATE_QUESTION_SUCCESS: {
            const updatedQuestion = action.payload;
            return {
              ...state,
              allquestions: state.allquestions.map((q) =>
                q.id === updatedQuestion.id ? updatedQuestion : q
              ),
            };
          }
    
        // delete question

        // case constant.DELETE_QUESTION_SUCCESS: {
        //     let allquestions = state.allquestions.filter((d) => d.id !== action.payload)
        //     return { ...state, allquestions: allquestions };
        // }
        case constant.DELETE_QUESTION_SUCCESS: {
            const deletedQuestionId = action.payload;
            return {
              ...state,
              allquestions: state.allquestions.filter((q) => q.id !== deletedQuestionId),
            };
          }

        default:
            return state;
    }
}