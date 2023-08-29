import axios from 'axios'
import * as constants from '../../util/Constant'
import * as constant from './constant.js'
import {Get} from '../../util/HttpService.js'

export function getAllFeedback() {
    return (dispatch) => {
        const url = `${constants.baseURL}/feedback`;

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

export function resetIsFeedbackSuccessResponse(){
    return { type: constant.RESET_FEEDBACK_SUCCESS_RES}
}