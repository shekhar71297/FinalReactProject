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
import { TextFields } from '@mui/icons-material';
import Modal from '@mui/material/Modal';
class NewStudentRegistration extends Component {
  constructor(props) {
    super(props)

    this.state = {
      students:[],
      id: null,
      firstname: '',
      lastname: '',
      email: '',
      contact: '',
      dob: '',
      gender: '',
      organization: '',
      branch:null,
      term: false,
      open: false,
      

    }
  }



  addResgisterStudent = (event) => {
    event.preventDefault();
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
      showCdacTextField: false,

    })

    const payload = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      contact: this.state.contact,
      dob: this.state.dob,
      gender: this.state.gender,
      organization: this.state.organization,
      branch: this.state.organization === "hematite" || this.state.organization === "cdac" ? "" : this.state.branch
    }
    this.props.addStudentRequest(payload)
    window.alert("Student Registered Successfully ")
    this.props.router.navigate("/")
  }


  handleClearForm = () => {
    this.setState({
      firstname: (''),
      lastname: (''),
      email: (''),
      contact: (''),
      dob: (''),
      gender: (''),
      organization: (''),

    })

  }

  handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'organization') {
      this.setState({
        [name]: value,
        showCdacTextField: value === 'cdac',
      });
    } else if (name === 'cdac') {
      this.setState({
        [name]: value,
        showCdacTextField: true,
      });
    } else {
      this.setState({
        [name]: value,
      });
    }
  };



  render() {
    const { pnr, firstname, lastname, email, contact, dob, gender, organization,branch} = this.state;
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
            <Typography component="h1" variant="h5" gutterBottom sx={{marginTop:8}}>
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
              />
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
                  value={gender}
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
                <InputLabel id="demo-simple-select-label"></InputLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="organization"
                >
                  <br /><br />
                  <FormControlLabel value="hematite" onChange={(e) => this.handleChange(e)} control={<Radio />} label="Hematite" />
                  <FormControlLabel value="lighthouse" onChange={(e) => this.handleChange(e)} control={<Radio />} label="Lighthouse" />

                  <FormControlLabel value="cdac" onChange={(e) => this.handleChange(e)} control={<Radio />} label="Cdac" />
                </RadioGroup>
                {
                  this.state.organization === "lighthouse" && <Select
                    name='organization'
                    value={organization}
                    onChange={this.handleChange}
                  // label='Select Organization'
                  >
                    <MenuItem value=''>Select Organizantion</MenuItem>
                    <MenuItem value='Hadapsar'>Hadapsar</MenuItem>
                    <MenuItem value='Warje'>Warje</MenuItem>
                    <MenuItem value='Vadgoansheri'>Vadgoansheri</MenuItem>
                    <MenuItem value='Vadgoansheri'>Pimpri</MenuItem>
                  </Select>
                }


                {this.state.organization === 'cdac' && this.state.showCdacTextField && (
                  <TextField
                    id="standard-basic"
                    variant="standard"
                    name="pnr" 
                    placeholder="pnr"
                    value={pnr} 
                    onChange={this.handleChange}
                  />
                )}

              </FormControl>

              <Button style={{ marginTop: "20px", marginRight: "15px" }} variant="contained" color="primary" type="submit">Submit</Button>
              <Button onClick={this.handleClearForm} style={{ marginTop: "20px", marginRight: "-352px" }} variant="contained" color="secondary" type="reset">Clear</Button>
            </form>

          </div>
        </Box>
        
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

      // </Modal>

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



export default connect(mapStateToProps, mapDispatchToprops)(WithRouter(NewStudentRegistration));


