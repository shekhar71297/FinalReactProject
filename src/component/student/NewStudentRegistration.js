import React, { Component } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
// import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// import Button from '@mui/material/FormLabel';
import Form from 'react'
// import Button from '@mui/material/Button';
import { Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { Link } from '@mui/material';
import axios from 'axios';
// import Nav from './Nav'

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
      term: false
    }
  }

  addResgisterStudent = (event) => {
    event.preventDefault();

    axios.post("http://localhost:8888/students", this.state).then(() => {
      window.alert("Student Registered Successfully ")
    })
  }
  handleDropdownChange = (event) => {
    this.setState({
      organization: event.target.value,
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { id, firstname, lastname, email, contact, dob, gender, organization, term } = this.state;
    return (
      <Box sx={{
        marginTop: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: "600px",
        margin: "auto",
        border:"2px solid white",
        backgroundColor:"whitesmoke",
        height:"700px",
        padding:"10px"
      }}  >
        <div >
        <Typography variant="h6" gutterBottom>
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
              type="number"
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
              // label="Date of Birth"
              onChange={this.handleChange}
              value={dob}
              name='dob'
              fullWidth
              required
              sx={{ mb: 4 }}
            />
         
            <FormControl fullWidth >
              <p style={{marginLeft: "-490px"}}>Select Gender</p>
                <InputLabel id="demo-simple-select-label"></InputLabel>
                {/* <br /> */}
              <RadioGroup
                    row
                    // value={gender}
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    // name="row-radio-buttons-group"
                  >
                   <br /><br />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
              {/* <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={gender}
                label="organization"
                name='gender'
                onChange={this.handleChange}
              >
                {/* <MenuItem value='Male'>Male</MenuItem>
                <MenuItem value='Female'>Female</MenuItem>
                <MenuItem value='Other'>Other</MenuItem> 
              </Select> */}
              <br />
            </FormControl>
            {/* <br /> */}
            <FormControl fullWidth>
            <p style={{marginLeft: "-450px"}}>Select Organization</p>
              <InputLabel id="demo-simple-select-label"></InputLabel>
              <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    // name="row-radio-buttons-group"
                  >
                   <br /><br />
                    <FormControlLabel value="hemaitite" control={<Radio />} label="Hemaitie" />
                    <FormControlLabel value="lighthouse" control={<Radio />} label="Lighthouse" />
                    <FormControlLabel value="cdac" control={<Radio />} label="Cdac" />
              </RadioGroup>
              {/* <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={organization}
                label="organization"
                name='organization'
                onChange={this.handleChange}
              >
                <MenuItem value='Hematite'>Hematite</MenuItem>
                <MenuItem value='CDAC'>CDAC</MenuItem>
                <MenuItem value='Branch'>Branch</MenuItem>
              </Select> */}
            </FormControl>

            <Button style={{ marginTop: "20px", marginRight:"15px" }} variant="contained" color="primary" type="submit">Submit</Button>
            <Button style={{ marginTop: "20px",marginRight: "-352px" }} variant="contained" color="secondary" type="resrt">Clear</Button>
          </form>
          
        </div>
      </Box>


    )
  }
}

export default NewStudentRegistration ;
// sx={{ marginBottom: 4 }}