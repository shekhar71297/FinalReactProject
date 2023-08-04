import axios from 'axios'
import * as constant from './contsant'



// get data
export function getAllStudent(){

    return (dispatch)=>{  
       axios.get("http://localhost:8888/students").then(response => dispatch(getStudentsuccess(response.data)))
       .catch(error => dispatch(getStudenterror(error.response.data)) )
   
    }
   
   }

export function getStudentsuccess(payload){
    return { type: constant.GET_Student_SUCCESS ,payload}
}

export function getStudenterror(payload){
    return { type: constant.GET_Student_ERROR ,payload}
}

// post data

export function addAllStudent(data){

    return (dispatch)=>{  
       axios.post("http://localhost:8888/students", data).then(response => dispatch(addStudentsuccess(data)))
       .catch(error => dispatch(addStudenterror(error.response.data)) )
   
    }
   
   }

export function addStudentsuccess(payload){
    return { type: constant.ADD_Student_SUCCESS ,payload}
}

export function addStudenterror(payload){
    return { type: constant.ADD_Student_ERROR ,payload}
}


// update data
export function updateAllStudent(data){

    return (dispatch)=>{  
       axios.put(`http://localhost:8888/students/${data.id}`, data)
       .then(response => dispatch(updateStudentsuccess(data)))
       .catch(error => dispatch(updateStudenterror(error.response.data)) )
    }
   }
export function updateStudentsuccess(payload){
    return { type: constant.UPDATE_Student_SUCCESS ,payload}
}
export function updateStudenterror(payload){
    return { type: constant.UPDATE_Student_ERROR ,payload}
}
// delete Student
export function deleteAllStudent(id){

    return (dispatch)=>{  
       axios.delete(`http://localhost:8888/students/${id}`)
       .then(response => dispatch(deleteStudentsuccess(id)))
       .catch(error => dispatch(deleteStudenterror(error.response.data)) )
   
    }
   }

export function deleteStudentsuccess(payload){
    return { type: constant.DELETE_Student_SUCCESS ,payload}
}

export function deleteStudenterror(payload){
    return { type: constant.DELETE_Student_ERROR ,payload}
}

// get single Student

export function getsingleStudent(id){
    console.log(id)
    return {type: constant.GET_SINGLE_Student, payload:id}
}