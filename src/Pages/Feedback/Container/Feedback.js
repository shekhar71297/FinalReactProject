import React, { Component } from "react";
// import FeedbackModule from '../../../component/feedback/FeedbackModule'
import FeedDash from "../../../component/feedback/FeedDash";


class Feedback extends Component{
    render(){
        return(
            <div>
                {/* <FeedbackModule/> */}
                <FeedDash/>
            </div>
        )
    }
}

export default Feedback;