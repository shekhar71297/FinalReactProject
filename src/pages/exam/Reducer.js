import * as constant from "./Constant";

export const  initialState={
    allExams:[],
    exams:{},
    error:null
}

export default function examReducer(state = initialState , action){

    switch (action.type) {
        case constant.GET_EXAM_SUCCESS:{
            
            return{...state,exams:{},allExams:action.payload};
            
        }
    
        case constant.GET_EXAM_ERROR,
         constant.ADD_EXAM_ERROR,
         constant.UPDATE_EXAM_ERROR,
         constant.DELETE_EXAM_ERROR:{
            return{...state,exams:{},error:action.payload};
         }

        case constant.ADD_EXAM_SUCCESS:{
             
            let allExams=state.allExams;
            allExams.push(action.payload);
            return{...state,exams:{},allExams:allExams};
        }

        case constant.UPDATE_EXAM_SUCCESS:{
            const draft = state;
            const index = draft.allExams.findIndex((d)=>d.id===action.payload.id) || -1
            draft.allExams[index]=action.payload
            return draft;
            
        }

        case constant.DELETE_EXAM_SUCCESS:{
            // const draft = state;
            let allExam = state.allExams.filter((d)=>d.id!==action.payload)
            return {...state,allExams:allExam};
            
        }

        case constant.SINGLE_EXAM_SUCCESS:{
            // const draft = state;
            // const index = draft.allProducts.findIndex((d)=>d.id===action.payload) || -1
            // draft.product=draft.allProducts[index]
            // return draft;
            const index =state.allExams.findIndex(d=>d.id===action.payload);
            const exams=state.allExams[index];
            return{...state,exams:exams};
            
        }
        default:
            return state;
    }
}
