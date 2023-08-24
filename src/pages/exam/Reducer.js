import *  as constant from './Constant';

export const initialstate = {
    allExam: [],
    exam: {},
    error: null
}
export default function ExamReducer(state = initialstate, action) {
    switch (action.type) {
        case constant.GET_EXAM_SUCCESS:{
           
            return {...state,exam:{},allExam:action.payload}; 
        }
        case constant.GET_EXAM_ERROR ,
         constant.ADD_EXAM_ERROR,
        //   constant.UPDATE_STUDENT_ERROR ,
          constant.DELETE_EXAM_ERROR :
        {
           
            return {...state ,student:{},error:action.payload};

        }
        // add Exam

            case constant.ADD_EXAM_SUCCESS:{
              
                let allExam = state.allExam;
                allExam.push(action.payload);
                return {...state, exam:{},allExam:allExam};
            }

            // update EXAM
            // case constant.UPDATE_EXAM_SUCCESS:{
            // const draft=state
            // const index = state.allExam.findIndex((d)=>d.id===action.payload.id) || -1
    
            // // draft.allExam[index]=action.payload
            // // let allExam = state.allExam;
            // draft.allExam.splice(index , 1,action.payload);
            // return draft
            // }
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
