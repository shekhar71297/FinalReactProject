import *  as constant from './Constant'
export const initialstate = {
    allvouchers:[],
    voucher: {},
    error: null
}

export default function voucherReducer(state = initialstate, action) {
    switch (action.type){
        case constant.GET_VOUCHER_SUCCESS:{
        
            return {...state,voucher:{},allvouchers:action.payload}; 
    
        }

        case constant.GET_VOUCHER_ERROR,
          constant.UPDATE_VOUCHER_ERROR :{

            const draft =state;
            draft.error =action.payload;
            draft.voucher ={};
            return draft;
        }

        case constant.UPDATE_VOUCHER_SUCCESS:{
            

            const index = state.allvouchers.findIndex((d)=>d.id===action.payload.id);
                const vcodes = action.payload;
                let allvouchers = state.allFlowers;
                allvouchers.splice(index,1,vcodes);
                return {...state,vcodes:{},allvouchers:allvouchers};
 
            }
        }; 
        }
