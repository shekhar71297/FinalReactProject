import axios from 'axios'
import * as constant from './constant'
import * as Constant from '../../util/Constant'
import { Delete, Get, Post, Put } from '../../util/HttpService'




// get data
// export function getAllStudent(){

//     return (dispatch)=>{  
//         const url=`${Constant.baseURL}/students`
//        Get(url).then(response => dispatch(getStudentsuccess(response.data)))
//        .catch(error => dispatch(getStudenterror(error.response.data)) )
   
//     }
   
//    }

   export function getAllStudent() {
    return (dispatch) => {
        const url = `${Constant.baseURL}/students`;

        Get(url).then(response => {
                const reversedStudent = response.data.reverse(); // Reverse the array of users
                dispatch(getStudentsuccess(reversedStudent));
            })
            .catch(error => dispatch(getStudenterror(error.response.data)));
    };
}

export function getStudentsuccess(payload){
    return { type: constant.GET_STUDENT_SUCCESS ,payload}
}

export function getStudenterror(payload){
    return { type: constant.GET_STUDENT_ERROR ,payload}
}

// post data

export function addAllStudent(data){

    return (dispatch)=>{ 
        const url=`${Constant.baseURL}/students` 
       Post(url,data).then(response => dispatch(addStudentsuccess(data)))
       .catch(error => dispatch(addStudenterror(error.response.data)) )
   
    }
   
   }

export function addStudentsuccess(payload){
    return { type: constant.ADD_STUDENT_SUCCESS ,payload}
}

export function addStudenterror(payload){
    return { type: constant.ADD_STUDENT_ERROR ,payload}
}


// update data
export function updateAllStudent(data){

    return (dispatch)=>{  
        const url=`${Constant.baseURL}/students/${data.id}`
       Put(url,data)
       .then(response => dispatch(updateStudentsuccess(data)))
       .catch(error => dispatch(updateStudenterror(error.response.data)) )
    }
   }
export function updateStudentsuccess(payload){
    return { type: constant.UPDATE_STUDENT_SUCCESS ,payload}
}
export function updateStudenterror(payload){
    return { type: constant.UPDATE_STUDENT_ERROR ,payload}
}
// delete Student
export function deleteAllStudent(id){

    return (dispatch)=>{  
        const url=`${Constant.baseURL}/students/${id}`
       Delete(url)
       .then(response => dispatch(deleteStudentsuccess(id)))
       .catch(error => dispatch(deleteStudenterror(error.response.data)) )
   
    }
   }

export function deleteStudentsuccess(payload){
    return { type: constant.DELETE_STUDENT_SUCCESS ,payload}
}

export function deleteStudenterror(payload){
    return { type: constant.DELETE_STUDENT_ERROR ,payload}
}

// get single Student

export function getsingleStudent(id){
    
    return {type: constant.GET_SINGLE_STUDENT, payload:id}
}