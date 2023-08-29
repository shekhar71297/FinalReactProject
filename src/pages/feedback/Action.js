import axios from 'axios'
import * as Constants from '../../util/Constant'
import * as constant from './constant.js'
import {Get,Post,Put,Delete} from '../../util/HttpService.js'
  
export function getAllFeedback() {
    return (dispatch) => {
        const url = `${Constants.baseURL}/feedback`;

        Get(url)
            .then(response => {
                const reversedFeedback = response.data.reverse(); // Reverse the array of feedback
                dispatch(getFeedbackSuccess(reversedFeedback));
            })
            .catch(error => dispatch(getFeedbackError(error.response.data)));
    };
}

export function getFeedbackSuccess(payload){
    return { type: constant.GET_FEEDBACK_SUCCESS , payload}
}

export function getFeedbackError(payload){
    return { type: constant.GET_FEEDBACK_ERROR , payload}//catch error
}

//add feedback
export function addFeedBack(data){
    return (dispatch) =>{
        const url=`${Constants.baseURL}/feedback` 
        Post(url,data).then(response => dispatch(addFeedbackSuccess(data)))
        .catch(error => dispatch(addFeedbackError(error.response.data)) )
    
    }
}

export function addFeedbackSuccess(payload){
    return{ type: constant.ADD_FEEDBACK_SUCCESS , payload }
}

export function addFeedbackError(payload){
    return{ type: constant.ADD_FEEDBACK_ERROR , payload }
}

// UPDATE feedback
export function updateFeedback(data) {

    return (dispatch) => {
        const url = `${Constants.baseURL}/feedback/${data.id}`
         Put(url, data).then(response => dispatch(updatefeedbacksuccess(data)))
            .catch(error => dispatch(updatefeedbackerror(error.response.data)))
    }
}

export function updatefeedbacksuccess(payload) {
    return { type: constant.UPDATE_FEEDBACK_SUCCESS, payload }//action object
}

export function updatefeedbackerror(payload) {
    return { type: constant.UPDATE_FEEDBACK_ERROR, payload }
}

// DELETE feedback
export function deleteFeedback(id) {
    return (dispatch) => {
        const url = `${Constants.baseURL}/feedback/${id}`
         Delete(url).then(response => dispatch(deletefeedbacksuccess(id)))
            .catch(error => dispatch(deletefeedbackError(error.response.data)))
    }
}

export function deletefeedbacksuccess(payload) {
    return { type: constant.DELETE_FEEDBACK_SUCCESS, payload }//action object
}

export function deletefeedbackError(payload) {
    return { type: constant.DELETE_FEEDBACK_ERROR, payload }
}

export function getSinglefeedback(id) {
    return { type: constant.GET_SINGLE_FEEDBACK, payload: id }//action object
}
