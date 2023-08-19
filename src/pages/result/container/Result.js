import React, { Component } from 'react'
import StudentResult from '../../../component/result/StudentResult'

import * as resultaction from '../Action';
import { connect } from 'react-redux';
export class Result extends Component {
    render() {
        return (
            <div>

                <StudentResult {...this.props} />

            </div>
        )
    }
}
// redux code
const mapStateToProps = (state) => ({
    allresult: state.resultStore.allresult,
    //  deleteRecordId: state.deleteRecordId

});

const mapDispatchToprops = (dispatch) => ({
    initresultRequest: () => dispatch(resultaction.getAllResult()),
    deleteResultRequest: (id) => dispatch(resultaction.deleteAllResult(id)),
});

export default connect(mapStateToProps, mapDispatchToprops)(Result);
