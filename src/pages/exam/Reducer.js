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

            // update EXAM
           
            case constant.UPDATE_EXAM_SUCCESS:{
                const draft = state;
                const index = draft.allExam.findIndex((d)=>d.id===action.payload.id) || -1
                draft.allExam[index]=action.payload
                return draft;
                
            }
            // delete exam
            case constant.DELETE_EXAM_SUCCESS:{
               
            let allExam =state.allExam.filter((d)=>d.id !== action.payload)
            return {...state,allExam:allExam};
            }
            // edit Exam
            case constant.GET_SINGLE_EXAM:{
          
            const index = state.allExam.findIndex(d=> d.id === action.payload);
            const exam = state.allExam[index];
            return {...state,exam:exam}
            }
       // single recoord
            case constant.GET_SINGLE_EXAM:{
               
                const index =state.allExam.findIndex(d=>d.id===action.payload);
                const user=state.allExam[index];
                return{...state,user:user};   
            }
        default:
            return state;
    }
}