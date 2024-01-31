import * as constant from './constant'
import * as Constant from '../../util/Constant'
import { Delete, Get, Post, Put } from '../../util/HttpService'
import { urls } from '../../util/urls';


   export function getAllStudent() {
    return (dispatch) => {
        // const url = `${Constant.baseURL}/students`;

        Get(urls.students).then(response => {
                const reversedStudent = response.reverse(); // Reverse the array of users
                dispatch(getStudentsuccess(reversedStudent));
            })
            .catch(error => dispatch(getStudenterror(error.response)));
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
        // const url=`${Constant.baseURL}/students` 
       Post(urls.students,data).then(response => dispatch(addStudentsuccess(data)))
       .catch(error => dispatch(addStudenterror(error.response)) )
   
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
        // const url=`${Constant.baseURL}/students/${data.id}`
       Put(`${urls.students}/${data.id}`,data)
       .then(response => dispatch(updateStudentsuccess(data)))
       .catch(error => dispatch(updateStudenterror(error.response)) )
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
        // const url=`${Constant.baseURL}/students/${id}`
       Delete(`${urls.students}/${id}`)
       .then(response => dispatch(deleteStudentsuccess(id)))
       .catch(error => dispatch(deleteStudenterror(error.response)) )
   
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