import *  as constant from './Constant'
export const initialstate = {
    allresult:[],
    result: {},
    error: null
}




export default function resultreducer(state = initialstate, action) {
    switch (action.type) {
        case constant.GET_RESULT_SUCCESS:{
           
            return {...state,result:{},allresult:action.payload}; 
        }
        case constant.GET_RESULT_ERROR ,
          constant.DELETE_RESULT_ERROR :{
         
            return {...state ,result:{},error:action.payload};

        }

         // delete ptoduct
         case constant.DELETE_RESULT_SUCCESS:{
        let allresult =state.allresult.filter((d)=>d.id !== action.payload)
        return {...state,allresult:allresult};
        }
       
        default:
            return state;
    }
}