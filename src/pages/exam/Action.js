// import axios from 'axios'
import * as constant from './Constant'
import * as Constant from '../../util/Constant'
import { Delete, Get, Post, Put } from '../../util/HttpService'
import { urls } from '../../util/urls';


export function getAllExam() {
    return (dispatch) => {
        // const url = `${Constant.baseURL}/exams`;

        Get(urls.exams).then(response => {
            const reversedexam = response.reverse(); // Reverse the array of users
            dispatch(getExamsuccess(reversedexam));
        })
            .catch(error => dispatch(getExamerror(error.response)));
    };
}

export function getExamsuccess(payload) {
    return { type: constant.GET_EXAM_SUCCESS, payload }
}

export function getExamerror(payload) {
    return { type: constant.GET_EXAM_ERROR, payload }
}

// post data

export function addexam(data) {

    return (dispatch) => {
        // const url = `${Constant.baseURL}/exams`
        Post(urls.exams, data).then(response => dispatch(addexamsuccess(data)))
            .catch(error => dispatch(addexamterror(error.response)))

    }

}

export function addexamsuccess(payload) {
    return { type: constant.ADD_EXAM_SUCCESS, payload }
}

export function addexamterror(payload) {
    return { type: constant.ADD_EXAM_ERROR, payload }
}


// update data
export function updateExam(data) {

    return (dispatch) => {
        // const url = `${Constant.baseURL}/exams/${data.id}`
        Put(`${urls.exams}/${data.id}`, data)
            .then(response => dispatch(updateExamsuccess(data)))
            .catch(error => dispatch(updateExamerror(error.response)))
    }
}
export function updateExamsuccess(payload) {
    return { type: constant.UPDATE_EXAM_SUCCESS, payload }
}
export function updateExamerror(payload) {
    return { type: constant.UPDATE_EXAM_ERROR, payload }
}
// delete exam
export function deleteExam(id) {

    return (dispatch) => {
        // const url = `${Constant.baseURL}/exams/${id}`
        Delete(`${urls.exams}/${id}`)
            .then(response => dispatch(deleteExamsuccess(id)))
            .catch(error => dispatch(deleteExamerror(error.response)))

    }
}
export function deleteExamsuccess(payload) {
    return { type: constant.DELETE_EXAM_SUCCESS, payload }
}

export function deleteExamerror(payload) {
    return { type: constant.DELETE_EXAM_ERROR, payload }
}

// get single exam

export function getsingleexam(id) {

    return { type: constant.GET_SINGLE_EXAM, payload: id }
}