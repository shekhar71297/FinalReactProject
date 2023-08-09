import React from 'react'
import Questiontable from '../../../components/question/Questiontable'
import Addform from '../../../components/question/Addform'
import { connect } from 'react-redux'
import * as Action from '../../question/Action'


const Question = () => {
    return (
        <div>
            <Questiontable/>
            <Addform/>
            
        </div>
    )
}
const  mapStateToProps = (state) =>({
    allquestions: state.questionStore.allquestions
  })
  const  mapDispatchToProps = (dispatch) =>({
    initquestionRequest: ()=> dispatch(Action.getAllQuestions()),
    addQuestionRequest: (data)=> dispatch(Action.addAllQuestions(data))
  })

export default connect(mapStateToProps, mapDispatchToProps) (Question);
