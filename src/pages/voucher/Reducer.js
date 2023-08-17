import *  as constant from './Constant'
export const initialState = {
    allvouchers:[],
    voucher:{},
    error: null
}

export default function VoucherReducer(state = initialState, action) {
    switch (action.type) {
        case constant.GET_VOUCHER_SUCCESS: {

            return { ...state, voucher:{}, allvouchers: action.payload };

        }

        case constant.GET_VOUCHER_ERROR,
            constant.UPDATE_VOUCHER_ERROR: {

              return{...state,voucher:{},error:action.payload}
            }

        case constant.UPDATE_VOUCHER_SUCCESS: {


            const index = state.allvouchers.findIndex((d) => d.id === action.payload.id);
            const vcodes = action.payload;
            let allvouchers = state.allvouchers;
            allvouchers.splice(index, 1, vcodes);
            return { ...state, vcodes: {}, allvouchers: allvouchers };

        }
        default:
            return state
    };
}
