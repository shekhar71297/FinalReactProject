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
import WithRouter from '../../util/WithRouter';

  const defaultTheme = createTheme();  
export class StudentLogin extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             email:"",
             dob:""
        }
    }
     
    inputChangeHandler=(e)=>{
        const{name,value}=e.target;
        this.setState({[name]:value})
    }
    submitBtn=(e)=>{
        e.preventDefault()
          axios.get("http://localhost:8888/students",this.state).then((res)=>{
             const istrue=res.data.some((d)=>
              this.state.email===d.email && this.state.dob===d.dob
             )
              if(istrue){
                  sessionStorage.setItem("isLogin","true")
                  
                  // alert("Login Successfully")
                  window.alert("Login successfully");
                  // <Link to='/cat'/>
                  // this.props.router.navigate('/voucher')
  
             
              }else{
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
                <Link to='/feedback'><p>Feedback Form</p></Link>
                {/* <p>Contact Us</p> */}
                </Grid>
                <Grid item>
                <Link to='/Register'> New Student ? Register here</Link>
                </Grid>
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