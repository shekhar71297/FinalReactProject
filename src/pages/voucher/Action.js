import * as constants from '../../util/Constant';
import { Get, Put } from '../../util/HttpService';
import * as constant from "./Constant"


/////get method CRUd
export function getAllVouchers(){
    return(dispatch)=>{
        const url = `${constants.baseURL}/vcodes`
        Get(url).then(response=>dispatch(getVoucherSuccess(response.data)))
        .catch(error=>dispatch(getVoucherError(error.response.data)))
        
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
        const url = `${constants.baseURL}/vcodes/${data.id}`
           Put(url,data).then(response=>dispatch(updateVoucherSuccess(response.data)))
            .catch(error=>dispatch(updateVocuherError(error.response.data)))
    } 
        
}
export function updateVoucherSuccess(payload){
    return {type:constant.UPDATE_VOUCHER_SUCCESS,payload}
}

export function updateVocuherError(payload){
    return {type:constant.UPDATE_VOUCHER_ERROR,payload}
};
