import Questiontable from '../../../components/question/Questiontable'
import Addform from '../../../components/question/Addform'
import Popup from '../../../components/question/Popup'
import React, { Component } from 'react'
class QuestionMain extends Component {
  render() {
    return (
      <div>
        <Addform/>
        <Popup/>
        <Questiontable/>
      </div>
    )
  }
}



// const  mapStateToProps = (state) =>({
//     allquestions: state.questionStore.allquestions
//   })
//   const  mapDispatchToProps = (dispatch) =>({
//     initquestionRequest: ()=> dispatch(Action.getAllQuestions()),
//     addQuestionRequest: (data)=> dispatch(Action.addAllQuestions(data))
//   })

export default QuestionMain;
