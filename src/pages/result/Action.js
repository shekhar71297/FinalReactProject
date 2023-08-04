import axios from 'axios'
import * as constant from "./Constant"

export function getAllResult(){

    return (dispatch)=>{  
       axios.get("http://localhost:8888/StudentResult").then(response => dispatch(getResultsuccess(response.data)))
       .catch(error => dispatch(getResulterror(error.response.data)) )
    
    }
   
   }
  
export function getResultsuccess(payload){
    return { type: constant.GET_RESULT_SUCCESS ,payload}
}

export function getResulterror(payload){
    return { type: constant.GET_RESULT_ERROR ,payload}
}



export function deleteAllResult(id){

    return (dispatch)=>{  
       axios.delete(`http://localhost:8888/StudentResult/${id}`)
       .then(response => dispatch(deleteResultsuccess(id)))
       .catch(error => dispatch(deleteResulterror(error.response.data)) )
   
    }
   }

export function deleteResultsuccess(payload){
    return { type: constant.DELETE_RESULT_SUCCESS ,payload}
}

export function deleteResulterror(payload){
    return { type: constant.DELETE_RESULT_ERROR ,payload}
}

