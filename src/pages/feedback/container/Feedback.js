import React, { Component } from "react";
import FeedDash from "../../../component/feedback/FeedDash";
import * as Action from '../Action'
import { connect } from "react-redux";



const mapStateToProps = (state) => ({
    allFeedback: state.feedbackStore.allFeedback,
})
const mapDispatchToProps = (dispatch) => ({
    initFeedbackRequest: () => dispatch(Action.getAllFeedback()),
    addFeedbackRequest: (data) => dispatch(Action.addFeedBack(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(FeedDash)
