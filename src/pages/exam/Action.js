// import axios from 'axios';
import * as constant from './Constant'
import * as constants from '../../util/Constant'
import { Delete, Get, Post, Put } from '../../util/HttpService'

 
//GET Exam
export function getAllExam() {
    return (dispatch) => {
        const url = `${constants.baseURL}/exams`;

        Get(url)
            .then(response => {
                const reversedExams = response.data.reverse(); // Reverse the array of users
                dispatch(getexamsuccess(reversedExams));
            })
            .catch(error => dispatch(getexamError(error.response.data)));
    };
}


export function getexamsuccess(payload) {
    return { type: constant.GET_EXAM_SUCCESS, payload }//action object
}

export function getexamError(payload) {
    return { type: constant.GET_EXAM_ERROR, payload }
}

// POST Exam
export function addExam(data) {
    return (dispatch) => {
        const url = `${constants.baseURL}/exams`
         Post(url, data).then(response => dispatch(addexamsuccess(data)))
            .catch(error => dispatch(addexamError(error.response.data)))
    }
}

export function addexamsuccess(payload) {
    return { type: constant.ADD_EXAM_SUCCESS, payload }//action object
}

export function addexamError(payload) {
    return { type: constant.ADD_EXAM_ERROR, payload }
}

// UPDATE Exam
export function updateExam(data) {

    return (dispatch) => {
        const url = `${constants.baseURL}/exams/${data.id}`
         Put(url, data).then(response => dispatch(updateexamsuccess(data)))
            .catch(error => dispatch(updateexamerror(error.response.data)))
    }
}

export function updateexamsuccess(payload) {
    return { type: constant.UPDATE_EXAM_SUCCESS, payload }//action object
}

export function updateexamerror(payload) {
    return { type: constant.UPDATE_EXAM_ERROR, payload }
}

// DELETE Exam
export function deleteExam(id) {
    return (dispatch) => {
        const url = `${constants.baseURL}/exams/${id}`
         Delete(url).then(response => dispatch(deleteexamsuccess(id)))
            .catch(error => dispatch(deleteexamError(error.response.data)))
    }
}

export function deleteexamsuccess(payload) {
    return { type: constant.DELETE_EXAM_SUCCESS, payload }//action object
}

export function deleteexamError(payload) {
    return { type: constant.DELETE_EXAM_ERROR, payload }
}

export function getSingleexam(id) {
    return { type: constant.SINGLE_EXAM_SUCCESS, payload: id }//action object
}