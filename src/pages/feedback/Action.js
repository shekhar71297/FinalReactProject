import axios from 'axios'
import * as Constants from '../../util/Constant'
import * as constant from './constant.js'
import {Get,Post} from '../../util/HttpService.js'
  
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
        // axios.post("http://localhost:8888/feedback",data)
        // .then(response => dispatch(addFeedbackSuccess(data)))
        // .catch(error => dispatch(addFeedbackError(error.response.data)))
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