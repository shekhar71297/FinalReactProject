import * as constants from '../../util/Constant';
import { Get, Put ,Delete ,Post } from '../../util/HttpService';
import * as constant from "./Constant"
import { urls } from '../../util/urls';


/////get method CRUd
export function getAllVouchers(){
    return(dispatch)=>{
        // const url = `${constants.baseURL}/vcodes`
        Get(urls.vcodes).then(response=>dispatch(getVoucherSuccess(response)))
        .catch(error=>dispatch(getVoucherError(error.response)))
        
    }
}

export function getVoucherSuccess(payload){
    return {type:constant.GET_VOUCHER_SUCCESS,payload}
}

export function getVoucherError(payload){
    return {type:constant.GET_VOUCHER_ERROR,payload}
};

/////put method CRud
export function  updateAllVoucher(data) {

    return (dispatch)=>{
        // const url = `${constants.baseURL}/vcodes/${data.id}`
           Put(`${urls.vcodes}/${data.id}`,data).then(response=>dispatch(updateVoucherSuccess(response.data)))
            .catch(error=>dispatch(updateVocuherError(error.response)))
    } 
        
}
export function updateVoucherSuccess(payload){
    return {type:constant.UPDATE_VOUCHER_SUCCESS,payload}
}

export function updateVocuherError(payload){
    return {type:constant.UPDATE_VOUCHER_ERROR,payload}
};

///post 
export function addAllVouchers(data) {
    return (dispatch) => {
        // const url = `${constants.baseURL}/vcodes`
         Post(urls.vcodes, data).then(response => dispatch(addvouchersuccess(data)))
            .catch(error => dispatch(addvoucherError(error.response)))
    }
}

export function addvouchersuccess(payload) {
    return { type: constant.ADD_VOUCHER_SUCCESS, payload }//action object
}

export function addvoucherError(payload) {
    return { type: constant.ADD_VOUCHER_ERROR, payload }
};;


///Delet

export function deleteAllVouchers(id) {
    return (dispatch) => {
        // const url = `${constants.baseURL}/vcodes/${id}`
         Delete(`${urls.vcodes}/${id}`).then(response => dispatch(deletevouchersuccess(id)))
            .catch(error => dispatch(deletevoucherError(error.response)))
    }
}

export function deletevouchersuccess(payload) {
    return { type: constant.DELETE_VOUCHER_SUCCESS, payload }//action object
}

export function deletevoucherError(payload) {
    return { type: constant.DELETE_VOUCHER_ERROR, payload }
}

export function getSinglevoucher(id) {
    return { type: constant.GET_SINGLE_VOUCHER, payload: id }//action object
}

