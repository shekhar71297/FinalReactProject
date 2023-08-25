import *  as constant from './constant';

export const initialstate = {
    allstudent: [],
    student: {},
    error: null
}
export default function StudentReducer(state = initialstate, action) {
    switch (action.type) {
        case constant.GET_STUDENT_SUCCESS:{
           
            return {...state,student:{},allstudent:action.payload}; 
        }
        case constant.GET_STUDENT_ERROR ,
         constant.ADD_STUDENT_ERROR,
          constant.UPDATE_STUDENT_ERROR ,
          constant.DELETE_STUDENT_ERROR :{
           
            return {...state ,student:{},error:action.payload};

        }
       
        // add STUDENT

            case constant.ADD_STUDENT_SUCCESS:{
              
                let allstudent = state.allstudent;
                allstudent.push(action.payload);
                return {...state, STUDENT:{},allstudent:allstudent};
            }

            // update STUDENT
            case constant.UPDATE_STUDENT_SUCCESS:{
          
            const index = state.allstudent.findIndex((d)=>d.id===action.payload.id) || -1
            const STUDENT =action.payload;
            let allstudent = state.allstudent;
            allstudent.splice(index , 1,STUDENT);
            return {...state,STUDENT:{},allstudent:allstudent};
            }

            // delete student
            case constant.DELETE_STUDENT_SUCCESS:{
               
            let allstudent =state.allstudent.filter((d)=>d.id !== action.payload)
            return {...state,allstudent:allstudent};
            }
       

            // edit STUDENT
            case constant.GET_SINGLE_STUDENT:{
          
            const index = state.allstudent.findIndex(d=> d.id === action.payload);
            const student = state.allstudent[index];
            return {...state,student:student}
            }


        default:
            return state;

    }
}
