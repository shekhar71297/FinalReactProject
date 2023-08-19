import React, { Component } from 'react'
import ExamDashboard from '../../../component/exam/ExamDashboard'
import * as examaction from '../Action'
import { connect } from 'react-redux';

export class Exammodule extends Component {
    render() {
        return (
            <div>
                <ExamDashboard {...this.props} />
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    allExams: state.examStore.allExams,
    singleExam: state.examStore.exams
});

const mapDispatchToProps = (dispatch) => ({
    initExamRequest: () => dispatch(examaction.getAllExam()),
    updateExamRequest: (data) => dispatch(examaction.updateExam(data)),
    addExamRequest: (data) => dispatch(examaction.addExam(data)),
    deleteExamRequest: (id) => dispatch(examaction.deleteExam(id)),
    getSingleExamRequest: (id) => dispatch(examaction.getSingleexam(id))

})
export default connect(mapStateToProps, mapDispatchToProps)(Exammodule);
