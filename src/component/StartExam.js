import React, { Component } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';
import SubmitExam from './SubmitExam';
import DialogBox from './common/DialogBox';
import { BiSolidUserCircle } from 'react-icons/bi'
import Chip from '@mui/material/Chip';
import { connect } from 'react-redux';
import * as action from '../pages/question/Action'
import * as ResultAction from '../pages/result/Action'



class StartExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 3600,
      questions: [],
      selectedOptions: [],// Store selected options as objects: { questionIndex: 0, optionValue: 'optionA' }
      ObtainedMark: 0,
      studentName: '',
      endpage: false,
      openDialog: false,
      currentQuestionIndex: 0,
      intervalId: null, // Add this property to track the interval

    };
  }
  goToNextQuestion = () => {
    const { currentQuestionIndex, questions } = this.state;
    if (currentQuestionIndex < questions.length - 1) {
      this.setState((prevState) => ({
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
      }));
    }
  };
  goToLastQuestion = () => {
    const { questions } = this.state;
    this.setState({
      currentQuestionIndex: questions.length - 1,
    });
  };
  goToPreviousQuestion = () => {
    const { currentQuestionIndex } = this.state;
    if (currentQuestionIndex > 0) {
      this.setState((prevState) => ({
        currentQuestionIndex: prevState.currentQuestionIndex - 1,
      }));
    }
  };
  goToFirstQuestion = () => {
    this.setState({
      currentQuestionIndex: 0,
    });
  };

componentDidUpdate(prevProps){
  const selectedExam = this.props.selectedExam;
  if (prevProps.allquestions !== this.props.allquestions) {
    const filterQuestion=this.props.allquestions && this.props.allquestions.filter((val)=>val.examId===selectedExam)
      console.log(filterQuestion);
      this.setState({questions:filterQuestion})
  }
}
  componentDidMount() {
    // Fetch student name from sessionStorage
    const selectedExam = this.props.selectedExam;
    console.log('Selected Exam:',selectedExam);
    const studentName = sessionStorage.getItem("studentName");
    if (studentName) {
      this.setState({ studentName });
    }

    // Fetch data from the server
      // this.props.initquestionrequest()
      // axios.get("http://localhost:8888/questions").then((res) => {

      // const selectedExam = this.props.selectedExam;
      this.props.initquestionRequest()
      // console.log(res.data);
      // console.log('Selected Exam:',selectedExam);
    // console.log(this.props.allquestions);
    //   const filterQuestion=this.props.allquestions && this.props.allquestions.filter((val)=>val.examId===selectedExam)
    //   console.log(filterQuestion);
    //   this.setState({questions:filterQuestion})
      
  // })
      
    // });

    // Timer logic
    const intervalId = setInterval(() => {
      this.setState(prevState => ({
        timer: Math.max(0, prevState.timer - 1),
      }));
    }, 1000);
    
    // Store the interval ID in the state
    this.setState({ intervalId });
    // Add an event listener for the beforeunload event
    window.addEventListener("beforeunload", this.handleBeforeUnload);
    document.addEventListener("visibilitychange", this.handleVisibilityChange);
  }


  componentWillUnmount() {
    // Remove the event listener when the component is unmounted

    window.removeEventListener("beforeunload", this.handleBeforeUnload);
    document.addEventListener("visibilitychange", this.handleVisibilityChange);
    clearInterval(this.interval);
  }
  // Event handler for the beforeunload event
  handleBeforeUnload = (e) => {
    // If the exam hasn't been submitted yet
    if (!this.state.endpage) {
      e.preventDefault();
      e.returnValue = ""; // This is required for some browsers to show a confirmation dialog
      // this.submitExam();
    }
  };

  // Event handler for the visibilitychange event
  handleVisibilityChange = () => {
    // Check if the tab is hidden
    if (document.visibilityState === "hidden" && !this.state.endpage) {
      // this.submitExam();
    }
  };
  formatTimer = timer => {
    const hours = Math.floor(timer / 3600);
    const minutes = Math.floor((timer % 3600) / 60);
    const seconds = timer % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  inputChangeHandler = (e) => {
    const { value } = e.target;
    const { currentQuestionIndex } = this.state;
    
    // Remove previous selection for the same question index, if any
    const updatedSelectedOptions = this.state.selectedOptions.filter(
      option => option.questionIndex !== currentQuestionIndex
    );
    
    // Add the new selection for the current question
    updatedSelectedOptions.push({
      questionIndex: currentQuestionIndex,
      optionValue: value,
    });
    
    this.setState({ selectedOptions: updatedSelectedOptions });
  };
  

  // Inside your submitExam function
  handleOpenDialog = () => {
    this.setState({ openDialog: true });
  };

  handleCloseDialog = () => {
    this.setState({ openDialog: false });
  };
  submitExam = () => {
    this.props.initquestionRequest()
      const questionsData = this.props.allquestions;
      const selectedOptions = this.state.selectedOptions;
      sessionStorage.removeItem("isLogin");
      sessionStorage.removeItem("studentName")
      sessionStorage.removeItem("Voucher")
      const correctAnswers = selectedOptions.filter(option => {
        const question = questionsData[option.questionIndex];
        return option.optionValue === question.answer;
      });
  

      const ObtainedMark = correctAnswers.length; // Count of correct answers

      this.setState({ ObtainedMark, open: true });
      this.setState({ endpage: true })
      console.log(ObtainedMark);
      // const updateData= {
      //   StudentName: this.state.studentName,
      //   ObtainedMark: ObtainedMark,
      //  }
      // this.props.addResultRequest(updateData)
     
    
  }


  render() {
    const { timer, openDialog, questions, studentName, endpage, currentQuestionIndex } = this.state;
    const isFirstQuestion = currentQuestionIndex === 0;
    const isLastQuestion = currentQuestionIndex === questions.length - 1;
    const isExamSubmitted = this.state.endpage;
    return (
      
      <>
      
        {endpage ? (
          <SubmitExam />
        ) : (
          <div>
            <Box sx={{}}>
              <AppBar position="fixed">
                <Toolbar>

                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      display: 'flex',
                      alignItems: 'left',
                      marginLeft: 5,
                    }}
                  >
                    <Typography sx={{ fontSize: 47, marginTop: 1 }}><BiSolidUserCircle /></Typography>
                    <span style={{ marginTop: "20px", marginLeft: "5px", fontFamily: "ubuntu", fontSize: '24px' }}>Welcome, {studentName}</span>
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '24px', marginLeft: 'auto' }}>
                    {this.formatTimer(timer)}
                  </Typography>

                  {/* <Button variant='contained' color="warning" onClick={this.handleOpenDialog}>
                
              </Button> */}
                </Toolbar>
              </AppBar>
            </Box>

            <Box sx={{ marginTop: 5, padding: 16 }}>
              <Typography variant="h5" gutterBottom>
                Questions
              </Typography>
              {questions.length > 0 && currentQuestionIndex < questions.length ? (
                <Box
                  sx={{
                    marginBottom: '20px',
                    padding: '20px',
                    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                  }}
                >
                  <Typography sx={{ fontSize: "20px", textAlign: 'left' }} variant="h6" color='primary' gutterBottom>
                    {currentQuestionIndex + 1} .{questions[currentQuestionIndex].question}
                  </Typography>
                  <RadioGroup
                    sx={{ fontSize: "10px", textAlign: 'left' }}
                    aria-label={`question-${currentQuestionIndex}`}
                    name={`question-${currentQuestionIndex}`}
                    // By storing selected options as objects that include the question index, you ensure that each question's selected option is tracked separately. This should help avoid issues when questions or options are the same.
                    value={this.state.selectedOptions.find(option => option.questionIndex === currentQuestionIndex)?.optionValue || ''}
                    onChange={this.inputChangeHandler}
                  >
                    {questions[currentQuestionIndex].options.map((option, optionIndex) => (
                      <FormControlLabel
                        key={optionIndex}
                        value={option}
                        control={<Radio />}
                        label={option}
                      />
                    ))}
                  </RadioGroup>

                  {!isFirstQuestion && (
                    <Button variant="contained" color="primary" onClick={this.goToPreviousQuestion} sx={{ marginRight: '10px' }}>
                      Previous
                    </Button>
                  )}
                  {!isLastQuestion && (
                    <Button variant="contained" color="primary" onClick={this.goToNextQuestion} sx={{ marginRight: '10px' }}>
                      Next
                    </Button>
                  )}


                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginTop: '20px',
                      flexWrap: 'wrap', // Allow chips to wrap to the next line
                      gap: '5px', // Add spacing between chips
                    }}
                  >
                    {questions.map((id, index) => (
                     <Chip
                     key={id}
                     label={`${index + 1}`}
                     color={index === currentQuestionIndex ? 'primary' : 'default'}
                     onClick={() => this.setState({ currentQuestionIndex: index })}
                     sx={{ minWidth: '30px', height: '30px', fontSize: '12px' }} // Adjust the size of the chip
                   />
                    ))}
                  </Box>
                </Box>
              ) : null}
              {/* Submit or Logout Button */}
              <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px', overflowX: 'auto' }}>
                {isExamSubmitted ? (
                  <Button variant="contained" color="secondary" onClick={this.handleLogout}>
                    Logout
                  </Button>
                ) : (
                  <Button variant="contained" color="warning" onClick={this.handleOpenDialog}>
                    Submit Exam
                  </Button>
                )}
              </Box>
            </Box>
            {/* Dialog component */}
            <DialogBox
              open={openDialog}
              onClose={this.handleCloseDialog}
              onConfirm={() => {
                this.handleCloseDialog();
                this.submitExam();
              }}
              message={`Are you sure you want to submit the exam?`}
            />
          </div>
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  allquestions: state.questionStore.allquestions,
  allresult: state.resultStore.allresult,


});

const mapDispatchToprops = (dispatch) => ({
  initquestionRequest: () => dispatch(action.getAllQuestions()),
  initResultRequest:()=>dispatch(ResultAction.getAllResult()),
  addResultRequest:(data) =>dispatch(ResultAction.addResult(data))
});

export default connect(mapStateToProps,mapDispatchToprops) (StartExam);
