import React,{Component} from 'react'
import { connect } from 'react-redux'
import * as Action from '../action'
import StudentDashboard from '../../../component/student/StudentDashboard'



const mapStateToProps = (state) => ({
    allstudent: state.studentStore.allstudent,
    singelStudent: state.studentStore.student
  })
  
  const mapDispatchToprops = (dispatch) => ({
    initStudentRequest: () => dispatch(Action.getAllStudent()),
    deleteStudentRequest: (id) => dispatch(Action.deleteAllStudent(id)),
    updateStudentRequest: (id) => dispatch(Action.updateAllStudent(id)),
    getSingleStudentRequest: (id) => dispatch(Action.getsingleStudent(id)),
    addStudentRequest:(data)=>dispatch(Action.addAllStudent(data))
  })
  

export default connect(mapStateToProps,mapDispatchToprops) (StudentDashboard)
