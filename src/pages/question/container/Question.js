import Questiontable from '../../../component/question/Questiontable'
import Popup from '../../../component/question/Popup'
import React, { Component } from 'react'
class Question extends Component {
  render() {
    return (
      <div>
        
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

export default Question;
