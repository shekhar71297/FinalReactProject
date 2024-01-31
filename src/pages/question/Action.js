import * as constants from '../../util/Constant';
import { Get, Post, Put,Delete } from '../../util/HttpService';
import * as actionTypes from './ActionType'
import { urls } from '../../util/urls';

/////get method CRUD

export function getAllQuestions() {
    return (dispatch) => {
        // const url = `${constants.baseURL}/questions`
        Get(urls.questions).then(response => dispatch(getQuestionSuccess(response)))
            .catch(error => dispatch(getQuestionError(error.response)))
    }
}

export function getQuestionSuccess(payload) {
    return { type: actionTypes.GET_QUESTION_SUCCESS, payload }
}

export function getQuestionError(payload) {
    return { type: actionTypes.GET_QUESTION_ERROR, payload }
};

//post data

export function addQuestions(data) {

    return (dispatch) => {
        // const url = `${constants.baseURL}/questions`
        Post(urls.questions, data).then(response => dispatch(addQuestionsuccess(data)))
            .catch(error => dispatch(addQuestionerror(error.response)))

    }

}

export function addQuestionsuccess(payload) {
    return { type: actionTypes.ADD_QUESTION_SUCCESS, payload }
}

export function addQuestionerror(payload) {
    return { type: actionTypes.ADD_QUESTION_ERROR, payload }
}


/////put method CRUD

export function updateQuestion(data) {

    return (dispatch) => {
        // const url = `${constants.baseURL}/questions/${data.id}`
        Put(`${urls.questions}/${data.id}`, data).then(response => dispatch(updateQuestionSuccess(data)))
            .catch(error => dispatch(updateQuestionError(error.response)))
    }

}
export function updateQuestionSuccess(payload) {
    return { type: actionTypes.UPDATE_QUESTION_SUCCESS, payload }
}

export function updateQuestionError(payload) {
    return { type: actionTypes.UPDATE_QUESTION_ERROR, payload }
};

// Delete Data

export function deleteAllQuestions(id){

    return (dispatch)=>{  
        // const url=`${constants.baseURL}/questions/${id}`
       Delete(`${urls.questions}/${id}`)
       .then(response => dispatch(deleteQuestionsuccess(id)))
       .catch(error => dispatch(deleteQuestionerror(error.response)) )
   
    }
   }

export function deleteQuestionsuccess(payload){
    return { type: actionTypes.DELETE_QUESTION_SUCCESS ,payload}
}

export function deleteQuestionerror(payload){
    return { type: actionTypes.DELETE_QUESTION_ERROR ,payload}
}


