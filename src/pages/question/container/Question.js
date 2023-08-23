import React, { Component } from 'react';
import Questiontable from '../../../component/question/Questiontable';
import * as actions from '../action'
import { connect } from 'react-redux';




class Question extends Component {
  render() {
    return (
      <div>
        <Questiontable {...this.props} />
      
      </div>
    )
  }
}



const mapStateToProps = (state) => ({
  allquestions: state.questionStore.allquestions,
  singlequestion: state.questionStore.questions
})
const mapDispatchToProps = (dispatch) => ({
  addQuestionRequest:(data)=>dispatch(actions.addQuestions(data)),
  getSinglequestionrequest:(id) => dispatch(actions.getSingleQuestion(id)),
  updatequestionrequest:(data) => dispatch(actions.updateQuestion(data)),
  deletequestionrequest:(id) => dispatch(actions.deleteAllQuestions(id)),
  initquestionrequest:(selectedExam) => dispatch(actions.getAllQuestions(selectedExam)),
  


}) 

export default connect(mapStateToProps, mapDispatchToProps)(Question);
