import * as constant from './Constant'
import * as constants from '../../util/Constant'
import { Get } from '../../util/HttpService'



export function getAllQuestions ()  {
  return (dispatch)=>{
    const url = `${constants.baseURL}`
    Get(url)
    .then(response => dispatch(getQuestionSuccess(response.data)))
    .catch(error => dispatch(getQuestionError(error.response.data)))
  
  }
  
}

export function getQuestionSuccess(payload) {
  return {type: constant.GET_QUESTION_SUCCESS, payload}
   
  
}
export function getQuestionError(payload) {
    return {type: constant.GET_QUESTION_ERROR, payload}
     
    
  }


  export function addAllQuestions (data)  {
    return (dispatch)=>{
      const url = `${constants.baseURL}/react`
      Get(url,data)
      .then(response => dispatch(addQuestionSuccess(response.data)))
      .catch(error => dispatch(addQuestionError(error.response.data)))
    }
    
  }
  
  export function addQuestionSuccess(payload) {
    return {type: constant.ADD_QUESTION_SUCCESS, payload}
     
    
  }
  export function addQuestionError(payload) {
      return {type: constant.ADD_QUESTION_ERROR, payload}
       
      
    }