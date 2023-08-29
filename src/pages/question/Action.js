import * as constants from '../../util/Constant';
import { Get, Post, Put,Delete } from '../../util/HttpService';
import * as actionTypes from './actiontype'

/////get method CRUD

export function getAllQuestions() {
    return (dispatch) => {
        const url = `${constants.baseURL}/questions`
        Get(url).then(response => dispatch(getQuestionSuccess(response.data)))
            .catch(error => dispatch(getQuestionError(error.response.data)))
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
        const url = `${constants.baseURL}/questions`
        Post(url, data).then(response => dispatch(addQuestionsuccess(data)))
            .catch(error => dispatch(addQuestionerror(error.response.data)))

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
        const url = `${constants.baseURL}/questions/${data.id}`
        Put(url, data).then(response => dispatch(updateQuestionSuccess(data)))
            .catch(error => dispatch(updateQuestionError(error.response.data)))
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
        const url=`${constants.baseURL}/questions/${id}`
       Delete(url)
       .then(response => dispatch(deleteQuestionsuccess(id)))
       .catch(error => dispatch(deleteQuestionerror(error.response.data)) )
   
    }
   }

export function deleteQuestionsuccess(payload){
    return { type: actionTypes.DELETE_QUESTION_SUCCESS ,payload}
}

export function deleteQuestionerror(payload){
    return { type: actionTypes.DELETE_QUESTION_ERROR ,payload}
}


