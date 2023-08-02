import React from 'react'
// import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { hover } from '@testing-library/user-event/dist/hover';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Link } from 'react-router-dom';


const defaultTheme = createTheme();


const StudentLogin = () => {
//   const navigate=useNavigate();
  const[user,setUser]=useState({
      semail:"",
      sdob:""
    });


    const inputChangeHandler=(event)=>{
      setUser({...user,[event.target.name]:event.target.value});
  }
  
  const checkData =(event)=>{
      event.preventDefault();
      console.log(user.semail);
      console.log(user.sdob);
      axios.get("http://localhost:8888/students").then((res) => {
                  // console.log(res.data);  
                  const data =res.data.filter((item)=>{return item.semail===user.semail && item.sdob===user.sdob})

                  if(data.length > 0){
                      console.log(user.semail,user.sdob);                                   
                      sessionStorage.setItem("islogin",user.semail);
                    //   navigate("/voucher");
                  }else{
                      window.alert("wrong credential");
                      setUser({semail:"",sdob:""});
                  }
          });
      
  }

  // const handleSubmit = (event) => {
  
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get('email'),
  //     dob: data.get('dob'),
  //     // password: data.get('dob'),
  //   });
  
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
          <Box component="form" onSubmit={checkData} marginTop={3} padding={3} boxShadow={'5px 5px 10px #ccc'} sx={{  ":hover": {
              boxShadow:'10px 10px 20px #ccc'
            }}} >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Enter Email/Username"
              name="semail"
              autoComplete="email"
              autoFocus
              value={user.semail}
              onChange={inputChangeHandler}

            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Dob"
              name="sdob"
              type="date"
              id="dob"
              value={user.sdob}
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
                <Link to="/register" variant="body2" style={{ color: 'red', textDecoration: 'none' }}>
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

    </div>
  )};


export default StudentLogin;
