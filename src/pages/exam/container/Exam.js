import React, { Component } from 'react'
import ExamModule from '../../../component/exam/ExamModule'
import * as examaction from '../Action';
import { connect } from 'react-redux';
export class Exam extends Component {
    
    render() {
        return (
            <div>
                <ExamModule {...this.props}/>
            </div>
        )
    }
}

// redux code
const mapStateToProps = (state) => ({
    allExam: state.ExamStore.allExam,
    
});

const mapDispatchToprops = (dispatch) => ({
    initexamRequest: () => dispatch(examaction.getAllExam()),
    deleteexamRequest: (id) => dispatch(examaction.deleteExam(id)),
    updateexamRequest: (data) => dispatch(examaction.updateExam(data)),
    getSinglexamRequest: (id) => dispatch(examaction.getsingleexam(id)),
    addexamRequest:(data)=>dispatch(examaction.addexam(data))
});
export default connect(mapStateToProps, mapDispatchToprops)(Exam);
