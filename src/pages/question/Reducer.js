import *  as constant from './ActionType'
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

        // delete ptoduct
        case constant.DELETE_QUESTION_SUCCESS: {
            let allquestions = state.allquestions.filter((d) => d.id !== action.payload)
            return { ...state, allquestions: allquestions };
        }

        default:
            return state;
    }
}