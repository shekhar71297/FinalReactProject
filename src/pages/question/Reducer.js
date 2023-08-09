import *  as constant from './Constant'

export const initialstate = {
    allquestions:[],
    question:{},
    error: null
}

export default function questionreducer  (state = initialstate, action){
    switch (action.type){
        case constant.GET_QUESTION_SUCCESS:{

            return {...state,question:{},allquestions:action.payload};

        }
        case constant.GET_QUESTION_ERROR,
        constant.ADD_QUESTION_ERROR:{

            return {...state,question:{},error:action.payload};

        } 

        case constant.ADD_QUESTION_SUCCESS:{
            let allquestions = state.allquestions
            allquestions.push(action.payload)
            return {...state,question:{},allquestions:allquestions};
        }
        default:
            return state;
    }
}