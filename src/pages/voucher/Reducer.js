import *  as constant from './Constant'
export const initialState = {
    allvouchers: [],
    voucher: {},
    error: null
}

export default function VoucherReducer(state = initialState, action) {
    switch (action.type) {
        case constant.GET_VOUCHER_SUCCESS: {

            return { ...state, voucher: {}, allvouchers: action.payload };

        }

        case constant.GET_VOUCHER_ERROR,
            constant.UPDATE_VOUCHER_ERROR,
            constant.DELETE_VOUCHER_ERROR,
            constant.ADD_VOUCHER_ERROR: {

                return { ...state, voucher: {}, error: action.payload };
            }

        case constant.UPDATE_VOUCHER_SUCCESS: {


            const index = state.allvouchers.findIndex((d) => d.id === action.payload.id);
            const vcodes = action.payload;
            let allvouchers = state.allvouchers;
            allvouchers.splice(index, 1, vcodes);
            return { ...state, voucher: {}, allvouchers: allvouchers };

        }

        case constant.ADD_VOUCHER_SUCCESS:{
             
            let allvouchers=state.allvouchers;
            allvouchers.push(action.payload);
            return{...state,voucher:{},allvouchers:allvouchers};
        }


        case constant.DELETE_VOUCHER_SUCCESS:{
            // const draft = state;
            let allvouchers = state.allvouchers.filter((d)=>d.id!==action.payload)
            return {...state,allvouchers:allvouchers};
            
        }
        case constant.GET_SINGLE_VOUCHER:{
            const index =state.allvouchers.findIndex(d=>d.id===action.payload);
            const voucher=state.allvouchers[index];
            return{...state,voucher:voucher};
            
        }

        default:
            return state;
    };
}
