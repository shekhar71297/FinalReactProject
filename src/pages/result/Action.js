// import axios from 'axios'
import * as actiontype from "./Constant"
import * as constants from '../../util/Constant';
import { Get, Delete,Post ,Put} from '../../util/HttpService'
import { urls } from "../../util/urls";
 
export function getAllResult() {
    return (dispatch) => {
        // const url = `${constants.baseURL}/StudentResult`
        Get(urls.StudentResult).then(response => {
            let results = [];
            response.forEach((item,) => {
                let result = { ...item };
                // result['srno'] = index + 1;
                const { ObtainedMark, TotalMark } = result;
                const percent = (ObtainedMark / TotalMark) * 100;
                if (percent >= 50) {
                    result['status'] = "pass";
                }
                else {
                    result['status'] = "fail";
                }
                results.push(result);

            });
            results.reverse();
            dispatch(getResultsuccess(results))
        })
            .catch(error => dispatch(getResulterror(error.response)))
    }
}
export function getResultsuccess(payload) {
    return { type: actiontype.GET_RESULT_SUCCESS, payload }
}
export function getResulterror(payload) {
    return { type: actiontype.GET_RESULT_ERROR, payload }
}

// DELETE
export function deleteAllResult(id) {
    // const url = `${constants.baseURL}/StudentResult/${id}`
    return (dispatch) => {
        Delete(`${urls.StudentResult}/${id}`)
            .then(response => dispatch(deleteResultsuccess(id)))
            .catch(error => dispatch(deleteResulterror(error.response)))

    }
}

export function deleteResultsuccess(payload) {
    return { type: actiontype.DELETE_RESULT_SUCCESS, payload }
}

export function deleteResulterror(payload) {
    return { type: actiontype.DELETE_RESULT_ERROR, payload }
}
//post
export function addResult(data) {

    return (dispatch) => {
        // const url = `${constants.baseURL}/StudentResult`
        Post(urls.StudentResult, data).then(response => dispatch(addResultSuccess(data)))
            .catch(error => dispatch(addResultError(error.response)))

    }

}

export function addResultSuccess(payload) {
    return { type: actiontype.ADD_RESULT_SUCCESS, payload }
}

export function addResultError(payload) {
    return { type: actiontype.ADD_RESULT_ERROR, payload }
}
// UPDATE
export function updateResult(data) {

    return (dispatch) => {
        // const url = `${constants.baseURL}/StudentResult/${data.id}`
        Put(`${urls.StudentResult}/${data.id}`, data)
            .then(response => dispatch(updateResultsuccess(data)))
            .catch(error => dispatch(updateResulterror(error.response)))
    }
}
export function updateResultsuccess(payload) {
    return { type: actiontype.UPDATE_RESULT_SUCCESS, payload }
}
export function updateResulterror(payload) {
    return { type: actiontype.UPDATE_RESULT_ERROR, payload }
}

export function getsingleexam(id) {

    return { type: actiontype.GET_SINGLE_RESULT, payload: id }
}