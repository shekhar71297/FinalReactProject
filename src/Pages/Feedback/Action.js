import axios from 'axios'
import * as constant from './Constant.js'

//get feedback
export function getAllFeedback() {
    return (dispatch) => {
        axios.get("http://localhost:8888/feedback")
            .then(response => dispatch(getFeedbackSuccess(response.data)))
            .catch(error => dispatch(getFeedbackError(error.response.data)))
    }
}

export function getFeedbackSuccess(payload){
    return { type: constant.GET_FEEDBACK_SUCCESS , payload}
}

export function getFeedbackError(payload){
    return { type: constant.GET_FEEDBACK_ERROR , payload}
}


//add feedback
export function addFeedBack(data){
    return (dispatch) =>{
        axios.post("http://localhost:8888/feedback",data)
        .then(response => dispatch(addFeedbackSuccess(data)))
        .catch(error => dispatch(addFeedbackError(error.response.data)))
    }
}

export function addFeedbackSuccess(payload){
    return{ type: constant.ADD_FEEDBACK_SUCCESS , payload }
}

export function addFeedbackError(payload){
    return{ type: constant.ADD_FEEDBACK_ERROR , payload }
}