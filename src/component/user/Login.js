import React, { Component } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import {Link } from "react-router-dom";
// import {WithRouter} from '../util/WithRouter';
import WithRouter from '../../util/WithRouter';
 

  const defaultTheme = createTheme();  
export class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             email:"",
             password:"",
             role:""
        }
    }
     
    inputChangeHandler=(e)=>{
        const{name,value}=e.target;
        this.setState({[name]:value})
    }
    submitBtn=(e)=>{
        e.preventDefault()
          axios.get("http://localhost:8888/user",this.state).then((res)=>{
             const isTrue=res.data.some((d)=>
              this.state.email===d.email && this.state.password===d.password
             )
             if (isTrue) {
              const userRole = res.data.find(
                (d) =>
                  this.state.email === d.email &&
                  this.state.password === d.password &&
                  d.role === "admin" // Change this to "Teacher" if the role for teacher users is different
              );
        
              if (userRole) {
                sessionStorage.setItem("Admin","true");
                window.alert("Admin Login Successfully", JSON.stringify(this.state));
                this.props.router.navigate('/dashboard');
              } else {
                sessionStorage.setItem("Trainer","true");
                window.alert("Trainer Login Successfully", JSON.stringify(this.state));
                this.props.router.navigate('/dashboard');
              }
            } else {
              window.alert("Please check your registered email and dob");
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
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
             Admin Login
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
                label="password"
                name="password"
                type="password"
                id="dob"
                onChange={this.inputChangeHandler}
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
            
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
                <p>Feedback Form</p>
                </Grid>
                <Grid item>
                <Link to='/userreg'>  <p>don't have account ? Register here</p></Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        
        </Container>
      </ThemeProvider>
            </div>
        )
    }
}

export default WithRouter(Login)