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

const defaultTheme = createTheme();
export class StudentLogin extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: "",
      dob: ""
    }
  }

  inputChangeHandler = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  submitBtn = (e) => {
    e.preventDefault()
    this.props.initStudentRequest()

    const istrue = this.props.allstudent.some((d) =>
      this.state.email === d.email && this.state.dob === d.dob
    )
    if (istrue) {
      sessionStorage.setItem("isLogin", "true")


      window.alert("Login successfully", JSON.stringify(this.state));



    } else {
      window.alert("please cheack your register email and dob")
    }

  }

  render() {
    return (

      <div>

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
{/* Student Login */}
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
                    Login In
                  </Button>

                  <Grid container>
                    <Grid item xs>
                      <Link to='/feedback'><p>Feedback Form</p></Link>
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
          <Box sx={{ flexGrow: 1, marginTop: 18 }}>
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

export default connect(mapStateToProps, mapDispatchToprops)(StudentLogin)