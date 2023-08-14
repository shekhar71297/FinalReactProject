import React, { Component } from "react";
// import FeedbackModule from '../../../component/feedback/FeedbackModule'
import FeedDash from "../../../component/feedback/FeedDash";
import * as Action from '../Action'
import { connect } from "react-redux";


class Feedback extends Component{
    render(){
        return(
            <div>
                {/* <FeedbackModule/> */}
                <FeedDash {...this.props}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    allFeedback: state.feedbackStore.allFeedback

})
const mapDispatchToProps = (dispatch) => ({
    initFeedbackRequest: () => dispatch(Action.getAllFeedback()),
    addFeedbackRequest: (data) => dispatch(Action.addFeedBack(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(Feedback)
