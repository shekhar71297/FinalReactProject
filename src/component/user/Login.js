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
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { MenuItem } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

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
      snackbarOpen: false,
      snackbarMessage: '',
      isLoggedIn: false,
      showPassword: false,
      showAlert: false,
      alertMessage: '',
      alertSeverity: 'info',
    }
  }

  componentDidMount() {
    // this.props.initUserRequest();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.allUser !== this.props.allUser) {
      const isTrue = this.props.allUser.some((d) =>
        this.state.email === d.email && this.state.password === d.password && this.state.role === d.role
      );

      if (isTrue) {
        const user = this.props.allUser.find(
          (d) =>
            this.state.email === d.email &&
            this.state.password === d.password &&
            this.state.role === d.role
        );

        if (user) {
          const isAdmin = user.role === "admin";
          const isTrainer = user.role === "trainer";
          const isCounsellor = user.role === "counsellor";

          if (isAdmin || isTrainer || isCounsellor) {
            sessionStorage.setItem(user.role, "true");
            sessionStorage.setItem("user", `${user.fname} ${user.lname}`);
            this.handleShowAlert(`${user.role} Login Successfully`, 'success');

            setTimeout(() => {
              if (isAdmin) {
                // Redirect to the user module for admin
                this.props.router.navigate('/dashboard/user');
              } else {
                // Redirect to the student module for trainer and counsellors
                this.props.router.navigate('/dashboard/student');
              }
            }, 1000);

          }

        }
      } else {
        this.handleShowAlert('Please check your registered email,password and role', 'error');

      }
    }
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


  inputChangeHandler = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }
  submitBtn = (e) => {
    e.preventDefault();
    this.props.initUserRequest();


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
                  label="Password"
                  name="password"
                  type={this.state.showPassword ? 'text' : 'password'}
                  id="pass"
                  onChange={this.inputChangeHandler}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            this.setState((prevState) => ({
                              showPassword: !prevState.showPassword,
                            }))
                          }
                          edge="end"
                        >
                          {this.state.showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                                

                <TextField
                  select
                  margin="normal"
                  required
                  fullWidth
                  label="Role"
                  name="role"
                  id="role"
                  value={this.state.role}
                  onChange={this.inputChangeHandler}
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="trainer">Trainer</MenuItem>
                  <MenuItem value="counsellor">Counsellor</MenuItem>
                </TextField>



                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Login In
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
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