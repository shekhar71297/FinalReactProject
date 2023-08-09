// import axios from 'axios'
import * as constant from "./Constant"
import * as constants from '../../util/Constant';
import { Get, Delete } from '../../util/HttpService'


export function getAllResult() {
    return (dispatch) => {
        const url = `${constants.baseURL}/StudentResult`
        Get(url).then(response =>{
            let results = [];
            response.data.forEach((item) => {
                let result = { ...item };
                const {ObtainedMark,TotalMark} = result;
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
            .catch(error => dispatch(getResulterror(error.response.data)))
    }
}
export function getResultsuccess(payload) {
    return { type: constant.GET_RESULT_SUCCESS, payload }
}
export function getResulterror(payload) {
    return { type: constant.GET_RESULT_ERROR, payload }
}

export function deleteAllResult(id) {
    const url = `${constants.baseURL}/StudentResult/${id}`
    return (dispatch) => {
        Delete(url)
            .then(response => dispatch(deleteResultsuccess(id)))
            .catch(error => dispatch(deleteResulterror(error.response.data)))

    }
}

export function deleteResultsuccess(payload) {
    return { type: constant.DELETE_RESULT_SUCCESS, payload }
}

export function deleteResulterror(payload) {
    return { type: constant.DELETE_RESULT_ERROR, payload }
}

