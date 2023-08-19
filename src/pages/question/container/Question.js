import React, { Component } from 'react';
import Questiontable from '../../../component/question/Questiontable';
import Popup from '../../../component/question/Popup';
import * as actions from '../action'
import { connect } from 'react-redux';



class Question extends Component {
  render() {
    return (
      <div>

        <Popup />
        <Questiontable {...this.props} />
      </div>
    )
  }
}



const mapStateToProps = (state) => ({
  // allquestions: state.questionStore.allquestions
})
const mapDispatchToProps = (dispatch) => ({
  getAllQuestionsSuccess: (data) => dispatch(actions.getQuestionSuccess(data)),
  getAllQuestionsError: (data) => dispatch(actions.getQuestionError(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Question);
