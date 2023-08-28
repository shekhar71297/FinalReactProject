import React, { Component } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Instructions from './Instructions';
import { connect } from 'react-redux';
import * as examaction from '../pages/exam/Action'
import WithRouter from '../util/WithRouter';


class SelectExam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            examId: '',
            showInstruction: false,
        };
    }

    handleChange = (event) => {
        this.setState({
            examId: parseInt(event.target.value, 10),

        });
    };
    componentDidMount() {
        this.props.initexamRequest()
    }

    submitBtn = () => {
        sessionStorage.setItem('examId', this.state.examId);
        this.setState({ showInstruction: true })
        console.log(this.state.exam);
    }

    render() {
        const { allExam } = this.props;
        const { examId } = this.state;
        const { showInstruction } = this.state
        const activeExams = allExam.filter(exam => exam.examStatus);
        return (
            <div>
                {showInstruction ? (
                    this.props.router.navigate(`/quizapp/instruction/${this.state.examId}`)
                ) : (
                <>
                    <Box sx={{
                        margin: "auto",
                        marginTop: 10,
                        display: 'flex',
                        width: "700px",
                        height: "300px",
                        flexDirection: 'column',
                        alignItems: 'center',
                        boxShadow: '0px 0px 7px black',
                        borderRadius: "10px",
                        border: 'none',
                    }}>
                        <Box sx={{
                            width: "400px",
                            margin: "auto",
                            marginTop: 10,
                        }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={examId}
                                    label="Exam"
                                    name='exam'
                                    onChange={this.handleChange}
                                >

                                    {activeExams.map(exam => (
                                        <MenuItem key={exam.id} value={exam.id}>{exam.examName}</MenuItem>
                                    ))}

                                </Select>
                            </FormControl>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={this.submitBtn}
                            >
                                submit
                            </Button>

                        </Box>
                    </Box>
                </>
              )}
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    allExam: state.ExamStore.allExam,
});

const mapDispatchToprops = (dispatch) => ({
    initexamRequest: () => dispatch(examaction.getAllExam()),

});

export default connect(mapStateToProps, mapDispatchToprops)(WithRouter(SelectExam));
