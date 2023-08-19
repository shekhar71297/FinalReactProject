import React, { Component } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
import SubmitExam from './SubmitExam';
import DialogBox from './common/DialogBox';


class StartExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 3600,
      questions: [],
      selectedOptions: [],
      count: 0,
      studentName: '',
      endpage:false,
      openDialog: false,
    };
  }

  componentDidMount() {
    // Fetch student name from sessionStorage
    const studentName = sessionStorage.getItem("studentName");
    if (studentName) {
      this.setState({ studentName });
    }

    // Fetch data from the server
    axios.get("http://localhost:8888/react").then((res) => {
      this.setState({ questions: res.data });
    });

    // Timer logic
    this.interval = setInterval(() => {
      this.setState(prevState => ({
        timer: Math.max(0, prevState.timer - 1),
      }));
    }, 1000);
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
      this.submitExam();
    }
  };
  
 // Event handler for the visibilitychange event
 handleVisibilityChange = () => {
 // Check if the tab is hidden
  if (document.visibilityState === "hidden" && !this.state.endpage) {
    this.submitExam();
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
    this.setState((prevState) => ({
      selectedOptions: [...prevState.selectedOptions, value],
    }));
  };

  // Inside your submitExam function
  handleOpenDialog = () => {
    this.setState({ openDialog: true });
  };

  handleCloseDialog = () => {
    this.setState({ openDialog: false });
  };
  submitExam = () => {
    axios.get("http://localhost:8888/react").then((res) => {
      console.log(res.data);
      const questionsData = res.data;
      const selectedOptions = this.state.selectedOptions;
  
      const correctAnswers = questionsData.filter((question, index) => {
        return selectedOptions[index] === question.answer;
      });
  
      const count = correctAnswers.length; // Count of correct answers
  
      this.setState({ count, open: true });
      this.setState({endpage:true})
      console.log(count);
      axios.post("http://localhost:8888/examresult", {
        studentName: this.state.studentName,
        count: count,
      });
    }) }


  render() {
    const { timer, openDialog, questions, studentName, endpage, count } = this.state;
  

    return (
      <>
       {endpage ? (
        <SubmitExam />
      ) : (
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed">
            <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Welcome, {studentName} {/* Display studentName */}
              </Typography>
              <Typography variant="body2" sx={{ mr: 2, fontSize: '24px' }}>
                {this.formatTimer(timer)}
              </Typography>
              <Button variant='contained' color="warning" onClick={this.handleOpenDialog}>
                Submit Exam
              </Button>
            </Toolbar>
          </AppBar>
        </Box>

        <Box sx={{ marginTop: 5, padding: 16  }}>
          <Typography variant="h5" gutterBottom>
            Questions
          </Typography>
          {questions.map((question, index) => (
            <Box
              key={index}
              sx={{
                marginBottom: '20px',
                padding: '16px',
                boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
              }}
            >
              <Typography   sx={{ fontSize: "20px", textAlign: 'left' }}  variant="h6" color='primary' gutterBottom>
                {index + 1} .{question.question}
              </Typography>
           
                <RadioGroup  sx={{ fontSize: "10px", textAlign: 'left' }}  aria-label={`question-${index}`} onChange={this.inputChangeHandler} name={`question-${index}`}>
                  {question.options.map((option, optionIndex) => (
                    <FormControlLabel
                      key={optionIndex}
                      value={option}
                      control={<Radio />}
                      label={option}
                      
                    />
                  ))}
                </RadioGroup>
           
            </Box>
          ))}
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

export default StartExam;
