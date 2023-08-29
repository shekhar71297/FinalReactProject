import React, { Component } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import * as Action from '../../pages/student/action'
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import { Link } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { connect } from 'react-redux';
import WithRouter from '../../util/WithRouter';
import * as validation from '../../util/validation'
import { TextFields } from '@mui/icons-material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import MuiAlert from '@mui/material/Alert';
import Modal from '@mui/material/Modal';
class NewStudentRegistration extends Component {
  constructor(props) {
    super(props)

    this.state = {
      students: [],
      id: null,
      firstname: '',
      lastname: '',
      email: '',
      contact: '',
      dob: '',
      gender: '',
      organization: '',
      pnr: '',
      branch: '',
      term: false,
      open: false,
      isAddStudent: true,
      isDeletePopupOpen: false,
      deletingRecordId: null,
      isDetailsPopupOpen: false,
      selectedRecord: "",
      snackbarOpen: false,
      snackbarMessage: '',
      severity: '',
      errors: {
        fnameError: false,
        lnameError: false,
        emailError: false,
        contactError: false,
        pnrError: false
      }

    }
  }



  addResgisterStudent = (event) => {
    event.preventDefault();
    if (
      this.state.errors.fname ||
      this.state.errors.emailError ||
      this.state.errors.contactError ||
      this.state.errors.lnameError ||
      this.state.errors.pnrError


    ) {
      // Display an error message or take any necessary action
      this.setState({
        snackbarOpen: true,
        variant: "filled",
        snackbarMessage: "Please fix the validation errors before submitting.",
        severity: 'error',
      });
      return; // Prevent submission
    }
    this.setState({
      students: [],
      firstname: '',
      lastname: '',
      email: '',
      contact: '',
      dob: '',
      gender: '',
      organization: '',
      term: false,
      branch: '',
      pnr: "",
      isAddStudent: true,
      isDeletePopupOpen: false,
      deletingRecordId: null,
      isDetailsPopupOpen: false,
      selectedRecord: "",
      snackbarOpen: false,
      snackbarMessage: '',
      severity: 'success'

    })

    const payload = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      contact: this.state.contact,
      dob: this.state.dob,
      gender: this.state.gender,
      organization: this.state.organization,
      pnr: this.state.pnr,
      branch: this.state.branch === " " || this.state.organization === "cdac" ? "" : this.state.branch
    }
    this.props.addStudentRequest(payload)
    this.handleShowAlert('Student Registered successfully', 'success');

    // this.setState({
    //       snackbarOpen: true,
    //       snackbarMessage: 'Student Registered successfully',
    //       severity: 'success',
    //       variant:"filled"
    //     });

    setTimeout(() => {
      this.props.router.navigate("/");
    }, 2000);

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



  resetStudentFormHandler = () => {
    this.setState({
      firstname: (''),
      lastname: (''),
      email: (''),
      contact: (''),
      dob: (''),
      gender: (''),
      organization: (''),
      pnr: (''),
      branch: ('')

    })
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    }, () => {
      if (this.state.organization === "hematite") {
        this.setState({
          branch: "",
          pnr: ""
        })
      } else if (this.state.organization === "cdac") {
        this.setState({
          branch: "",
        })
      } else if (this.state.organization === "lighthouse") {
        this.setState({
          pnr: ""
        })
      }
    });
    // }

    this.setState({ [name]: value }, () => {
      if (name === "firstname") {
        const isFnameError = !(validation.isValidName(this.state[name]));
        this.setState({ errors: { ...this.state.errors, fnameError: isFnameError } })

      }
      if (name === "lastname") {
        const isLnameError = !(validation.isValidName(this.state[name]));
        this.setState({ errors: { ...this.state.errors, lnameError: isLnameError } })

      }

      if (name === "email") {
        const isEmailError = !(validation.isValidEmail(this.state[name]));
        this.setState({ errors: { ...this.state.errors, emailError: isEmailError } })

      }
      if (name === "gender") {
        this.setState({ gender: value });
      }

      if (name === "contact") {
        const isContactError = !(validation.isValidContact(this.state[name]));
        this.setState({ errors: { ...this.state.errors, contactError: isContactError } })

      }


      if (name === "pnr") {
        const isPnrError = !(validation.isValidPnr(this.state[name]));
        this.setState({ errors: { ...this.state.errors, pnrError: isPnrError } })

      }
    });
  };



  render() {
    const { pnr, firstname, lastname, email, contact, dob, gender, organization, branch } = this.state;
    const isSubmitDisabled = !firstname || !lastname || !email || !contact || !dob || !gender || !organization;
    return (
      // <Modal
      //   open={open}
      //   onClose={this.handleClose}
      //   aria-labelledby="modal-modal-title"
      //   aria-describedby="modal-modal-description">
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


        <Box sx={{
          marginTop: 13,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: "600px",
          margin: "auto",
          height: "700px",
          padding: "10px"
        }}  >
          <div >
            <Typography component="h1" variant="h5" gutterBottom sx={{ marginTop: 8 }}>
              New Register
            </Typography>
            <form onSubmit={this.addResgisterStudent} action={<Link to="" />}>
              <Stack spacing={2} direction="row" >

                <TextField
                  type="text"
                  variant='outlined'
                  color='secondary'
                  label="First Name"
                  onChange={this.handleChange}
                  value={firstname}
                  name='firstname'
                  fullWidth
                  required
                  error={this.state.errors.fnameError}
                  helperText={this.state.errors.fnameError && validation.errorText("Please enter a valid firstname") || "eg:John"}
                />

                <TextField
                  type="text"
                  variant='outlined'
                  color='secondary'
                  label="Last Name"
                  onChange={this.handleChange}
                  value={lastname}
                  name='lastname'
                  fullWidth
                  required
                  error={this.state.errors.lnameError}
                  helperText={this.state.errors.lnameError && validation.errorText("Please enter a valid last name") || 'eg: Dev'}
                />

              </Stack>
              <br />
              <TextField
                type="email"
                variant='outlined'
                color='secondary'
                label="Email"
                onChange={this.handleChange}
                value={email}
                name='email'
                fullWidth
                required
                sx={{ mb: 4 }}
                error={this.state.errors.emailError}
                helperText={this.state.errors.emailError && validation.errorText("Please enter a valid email") || "eg:jhon@123"}
              />
              {/* {this.state.errors.emailError &&(<span>Please enter a valid email</span>)} */}
              <TextField
                type="tel"
                variant='outlined'
                color='secondary'
                label="+91 contact number"
                onChange={this.handleChange}
                value={contact}
                name='contact'
                fullWidth
                required
                sx={{ mb: 4 }}
                error={this.state.errors.contactError}
                helperText={this.state.errors.contactError && validation.errorText("Please enter a valid contact") || "eg:99223344222"}
              />
              <TextField
                type="date"
                variant='outlined'
                color='secondary'
                onChange={this.handleChange}
                value={dob}
                name='dob'
                fullWidth
                required
                sx={{ mb: 4 }}
              />

              <FormControl fullWidth >
                <p style={{ marginLeft: "-490px" }}>Select Gender</p>
                <RadioGroup
                  aria-label='="gender'
                  name="gender"
                  value={gender || " "}
                  onChange={this.handleChange}
                  row
                >
                  <FormControlLabel value="Male" control={<Radio />} label="Male" />
                  <FormControlLabel value="Female" control={<Radio />} label="Female" />
                  <FormControlLabel value="Other" control={<Radio />} label="Transgender" />
                </RadioGroup>
              </FormControl>

              <FormControl fullWidth>
                <p style={{ marginLeft: "-450px" }}>Select Organization</p>
                <InputLabel id="demo-simple-select-label"> </InputLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="organization"
                  value={this.state.organization}
                >
                  <br /><br />
                  <FormControlLabel value="hematite" onChange={(e) => this.handleChange(e)} control={<Radio />} label="Hematite" />
                  <FormControlLabel value="lighthouse" onChange={(e) => this.handleChange(e)} control={<Radio />} label="Lighthouse" />

                  <FormControlLabel value="cdac" onChange={(e) => this.handleChange(e)} control={<Radio />} label="Cdac" />
                </RadioGroup>
                {
                  this.state.organization === "lighthouse" && <Select
                    name='branch'
                    value={branch}
                    onChange={this.handleChange}
                    aria-label='Choose branch'
                  >
                    <MenuItem value='' aria-label='Choose branch'>Select Organizantion</MenuItem>
                    <MenuItem value='Hadapsar'>Hadapsar</MenuItem>
                    <MenuItem value='Warje'>Warje</MenuItem>
                    <MenuItem value='Vadgoansheri'>Vadgoansheri</MenuItem>
                    <MenuItem value='Vadgoansheri'>Pimpri</MenuItem>
                  </Select>
                }


                {this.state.organization === 'cdac' && (
                  <TextField
                    id="standard-basic"
                    variant="standard"
                    name="pnr"
                    placeholder="pnr"
                    value={pnr}
                    onChange={this.handleChange}
                    error={this.state.errors.pnrError}
                    helperText={this.state.errors.pnrError && validation.errorText("Please enter a valid Pnr") || "eg:YvwQZT-77"}
                  />
                )}

              </FormControl>

              <Button style={{ marginTop: "20px", marginRight: "15px" }} variant="contained" color="primary" type="submit" disabled={isSubmitDisabled}>Submit</Button>
              <Button type="button" onClick={this.resetStudentFormHandler} style={{ marginTop: "20px", marginRight: "-352px" }} variant="contained" color="secondary" >Clear</Button>
            </form>

          </div>
        </Box>



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
      </Box>

      // </Modal>

    )
  }
}

const mapStateToProps = (state) => ({
  allstudent: state.studentStore.allstudent,
  singelStudent: state.studentStore.student
})

const mapDispatchToprops = (dispatch) => ({
  addStudentRequest: (data) => dispatch(Action.addAllStudent(data))
})



export default connect(mapStateToProps, mapDispatchToprops)(WithRouter(NewStudentRegistration));


