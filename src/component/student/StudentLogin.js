import React, { Component } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { Link } from "react-router-dom";
import WithRouter from '../../util/WithRouter';

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
    axios.get("http://localhost:8888/students", this.state).then((res) => {
      const istrue = res.data.some((d) =>
        this.state.email === d.email && this.state.dob === d.dob
      )
      if (istrue) {
        sessionStorage.setItem("isLogin", "true")

        // alert("Login Successfully")
        window.alert("Login successfully");
        // <Link to='/cat'/>
        // this.props.router.navigate('/voucher')


      } else {
        window.alert("please cheack your register email and dob")
      }
    })
  }


  render() {
    return (
      <div>
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
              <Typography component="h1" variant="h5">
                Student Login
              </Typography>
              <Box component="form" onSubmit={checkData} marginTop={3} padding={3} boxShadow={'5px 5px 10px #ccc'} sx={{
                ":hover": {
                  boxShadow: '10px 10px 20px #ccc'
                }
              }} >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Enter Email/Username"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={students.email}
                  onChange={inputChangeHandler}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="dob"
                  type="date"
                  id="dob"
                  value={students.dob}
                  onChange={inputChangeHandler}

                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                // onClick={()=>setIsLogin(!isLogin)}
                >
                  Login In
                </Button>
                <Grid container style={{ textAlign: 'left' }}>
                  <Grid item xs>
                    <Link to='/Register' variant="body2" style={{ color: 'red', textDecoration: 'none' }}>
                      New Student ? Register Here
                    </Link><br />
                    <Link href="#" variant="body2" style={{ color: 'red', textDecoration: 'none' }}>
                      Feedback ? Click Here
                    </Link>
                  </Grid>
                  <br />
                </Grid>
              </Box>
            </Box>

          </Container>
        </ThemeProvider>
        {/* { istrue && <Voucher/> } */}
      </div>
    )
  }

}

export default WithRouter(StudentLogin)