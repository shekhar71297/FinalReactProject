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
import { Link } from "react-router-dom";
import WithRouter from '../../util/WithRouter';
import * as useraction from '../../pages/user/action'
import { connect } from 'react-redux';


const defaultTheme = createTheme();
export class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: "",
      password: "",
      role: "",
      fname: "",
      lname: "",
      alertOpen: false,
      alertMessage: "",
      alertSeverity: "success",
    }
  }

  handleAlertClose = () => {
    this.setState({ alertOpen: false });
  };

  inputChangeHandler = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }
  submitBtn = (e) => {
    e.preventDefault();
    this.props.initUserRequest();

    const isTrue = this.props.allUser.some((d) =>
      this.state.email === d.email && this.state.password === d.password
    );

    if (isTrue) {
      const user = this.props.allUser.find(
        (d) =>
          this.state.email === d.email &&
          this.state.password === d.password
      );

      if (user) {
        const isAdmin = user.role === "admin";
        const isTrainer = user.role === "trainer";
        const isCounsellor = user.role === "counsellor";

        if (isAdmin || isTrainer || isCounsellor) {
          sessionStorage.setItem(user.role, "true");
          sessionStorage.setItem("user", `${user.fname} ${user.lname}`);
          window.alert(`${user.role} Login Successfully`);
          this.props.router.navigate('/dashboard');
        }
      }
    } else {
      window.alert("Please check your registered email and dob");
    }
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

const mapStateToProps = (state) => ({
  allUser: state.userStore.allUser,
  singleUser: state.userStore.user
});

const mapDispatchToProps = (dispatch) => ({
  initUserRequest: () => dispatch(useraction.getAlluser()),
  updateUserRequest: (id) => dispatch(useraction.updateUser(id)),
  addUserRequest: (data) => dispatch(useraction.addUser(data)),
  deleteUserRequest: (id) => dispatch(useraction.deleteUser(id)),
  getSingleUserRequest: (id) => dispatch(useraction.getSingleuser(id))

})

export default connect(mapStateToProps, mapDispatchToProps)(WithRouter(Login))