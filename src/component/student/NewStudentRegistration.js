import React, { Component } from 'react'
import * as constants from '../../util/Constant'
import { getData, DeleteData, UpdateData } from '../../util/HttpService';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import * as Student from '../../pages/student/action'
import Form from 'react'
import { Button } from '@mui/material'
import Stack from '@mui/material/Stack';
import { Link } from '@mui/material';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { connect } from 'react-redux';
import { SignalCellularNull, TextFields } from '@mui/icons-material';
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
      term: false,
      open: false

    }
  }



  addResgisterStudent = (event) => {
    event.preventDefault();
    this.setState({
      firstname: '',
      lastname: '',
      email: '',
      contact: '',
      dob: '',
      gender: '',
      organization: '',
      term: false,
      branch: null,
      pnr: "",
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
  }


  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
    // }, () => console.log("anmol state", this.state));

  };

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
    const { id, cdac, pnr, firstname, lastname, email, contact, dob, gender, organization, term, open } = this.state;
    return (
      // <Modal
      //   open={open}
      //   onClose={this.handleClose}
      //   aria-labelledby="modal-modal-title"
      //   aria-describedby="modal-modal-description">
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
            <Typography component="h1" variant="h5" gutterBottom >
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
                  // error
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
                // error
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
                // error
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
                // label="Date of Birth"
                // error
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
                    name="pnr" // Use the correct name here
                    placeholder="pnr"
                    value={pnr} // Use the correct value here
                    onChange={this.handleChange}
                  />
                )}

              </FormControl>

              <Button style={{ marginTop: "20px", marginRight: "15px" }} variant="contained" color="primary" type="submit">Submit</Button>
              <Button onClick={this.handleClearForm} style={{ marginTop: "20px", marginRight: "-352px" }} variant="contained" color="secondary" type="resrt">Clear</Button>
            </form>

          </div>
        </Box>
      // </Modal>

    )
  }
}
const mapStateToProps = (state) => ({
  allstudent: state.StudentStore.allstudent
})

const mapDispatchToprops = (dispatch) => ({
  initStudentRequest: () => dispatch(Student.getAllStudent()),
  addStudentRequest: (data) => dispatch(Student.addAllStudent(data)),


})

export default connect(mapStateToProps, mapDispatchToprops)(NewStudentRegistration);
// sx={{ marginBottom: 4 }}


