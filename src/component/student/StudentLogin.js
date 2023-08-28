import React, { Component } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import { connect } from 'react-redux'
import * as Action from '../../pages/student/action'
import Toolbar from '@mui/material/Toolbar';
import { Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import MuiAlert from '@mui/material/Alert';

import Vouchervalidation from '../voucher/Vouchervalidation';
import WithRouter from '../../util/WithRouter';

const defaultTheme = createTheme();
export class StudentLogin extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: "",
      dob: "",
      isDetailsPopupOpen: false,
      selectedRecord: "",
      snackbarOpen: false,
      snackbarMessage: '',
      severity: '',
      isLoggedIn: false,
      showAlert: false,
      alertMessage: '',
      alertSeverity: 'info',
    }
  }
  componentDidMount() {
    // this.props.initStudentRequest();
    
  }

  componentDidUpdate(prevProps) {
    if (prevProps.allstudent !== this.props.allstudent) {
    
      const istrue = this.props.allstudent.some((d) =>
        this.state.email === d.email && this.state.dob === d.dob
      );

      if (istrue) {
        // Null check for array
        const student = this.props.allstudent?.[0] && this.props.allstudent.find(
          (d) => this.state.email === d.email && this.state.dob === d.dob
        );


        sessionStorage.setItem("isLogin", "true");
        sessionStorage.setItem("studentName", `${student?.firstname} ${student?.lastname}`); // Set student's full name
        this.handleShowAlert(` Login Successfully`, 'success');
        
        setTimeout(() => {
          this.setState({ snackbarOpen: false });
          this.setState({ isLoggedIn: true });
        }, 1000);
      } else {
        this.handleShowAlert('Please Enter Correct Credentials', 'error');
      
      }
    }
  
   
  }
  inputChangeHandler = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  submitBtn = (e) => {
    e.preventDefault();
    this.props.initStudentRequest();


  }
  handleShowAlert = (message, severity) => {
    this.setState({
      showAlert: true,
      alertMessage: message,
      alertSeverity: severity,
    });
  };

  handleCloseAlert = () => {
    this.setState({
      showAlert: false,
      alertMessage: '',
    });
  };


  render() {
    const { isLoggedIn } = this.state;
    return (

      <div>
        {isLoggedIn ? (
          this.props.router.navigate('/quizapp/valid-voucher')

        ) : (
          <>

            <Box sx={{ flexGrow: 1 }}>
              <AppBar position="static">
                <Toolbar>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                  >
                  </IconButton>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{ textAlign: 'left', fontWeight: 'bold', width: '100px' }}>
                    Hematite Infotech Online-Quiz
                  </Typography>
                </Toolbar>
              </AppBar>
            
              <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                  <CssBaseline />
                  <Box
                    sx={{
                      marginTop: 8,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      Student Login
                    </Typography>
                    <Box component="form" onSubmit={this.submitBtn} noValidate sx={{ mt: 1 }}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Enter Email/Username"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={this.inputChangeHandler}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="dob"
                        type="date"
                        id="dob"
                        onChange={this.inputChangeHandler}
                      />

                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Login 
                      </Button>

                      <Grid container>
                        <Grid item xs>
                          <Link to='/form'><p>Feedback Form</p></Link>
                        </Grid>
                        <Grid item>
                          <Link to='/register'>  <p>New Student ? Register here</p></Link>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>

                </Container>
              </ThemeProvider>
              {/* footer */}
              <Box sx={{ flexGrow: 1, marginTop: 8 }}>
                <AppBar position="static">
                  <Toolbar>
                    <IconButton
                      size="large"
                      edge="start"
                      color="inherit"
                      aria-label="menu"
                      sx={{ mr: 2 }}
                    >

                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{ textAlign: 'right', fontWeight: 'bold', width: '100px', fontSize: '15px' }}>
                      Designed And Developed By  Sujit Gaikwad
                    </Typography>
                  </Toolbar>
                </AppBar>
              </Box>

            </Box>

              <Snackbar
          open={this.state.showAlert}
          autoHideDuration={4000}
          onClose={this.handleCloseAlert}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={this.handleCloseAlert}
            severity={this.state.alertSeverity}
          >
            {this.state.alertMessage}
          </MuiAlert>
        </Snackbar>
          </>
        )}
      </div>

    )
  }
}


const mapStateToProps = (state) => ({
  allstudent: state.studentStore.allstudent,
  singelStudent: state.studentStore.student
})

const mapDispatchToprops = (dispatch) => ({
  initStudentRequest: () => dispatch(Action.getAllStudent()),
  deleteStudentRequest: (id) => dispatch(Action.deleteAllStudent(id)),
  updateStudentRequest: (id) => dispatch(Action.updateAllStudent(id)),
  getSingleStudentRequest: (id) => dispatch(Action.getsingleStudent(id)),
  addStudentRequest: (data) => dispatch(Action.addAllStudent(data))
})

export default connect(mapStateToProps, mapDispatchToprops)(WithRouter(StudentLogin))