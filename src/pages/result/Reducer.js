import *  as constant from './Constant'
export const initialstate = {
    allresult: [],
    result: {},
    error: null
}

export default function resultreducer(state = initialstate, action) {
    switch (action.type) {
        case constant.GET_RESULT_SUCCESS: {

            return { ...state, result: {}, allresult: action.payload };
        }
        case constant.GET_RESULT_ERROR,
            constant.DELETE_RESULT_ERROR: {

                return { ...state, result: {}, error: action.payload };

            }
        //Add Result
        case constant.ADD_RESULT_SUCCESS: {

            let allresult = state.allresult;
            allresult.push(action.payload);
            return { ...state, result: {}, allresult: allresult };
        }

        // delete Result
        case constant.DELETE_RESULT_SUCCESS: {
            let allresult = state.allresult.filter((d) => d.id !== action.payload)
            return { ...state, allresult: allresult };
        }
        // update
        case constant.UPDATE_RESULT_SUCCESS: {
            const draft = state;
            const index = draft.allresult.findIndex((d) => d.id === action.payload.id) || -1
            draft.allresult[index] = action.payload
            return draft;

        }
        // single recoord
        case constant.GET_SINGLE_RESULT: {

            const index = state.allresult.findIndex(d => d.id === action.payload);
            const user = state.allresult[index];
            return { ...state, user: user };
        }

        default:
            return state;
    }
}