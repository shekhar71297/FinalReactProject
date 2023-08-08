import React, { Component } from 'react'

import { TextField, Button, Grid, Container, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height:500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  overflow:'auto',
  p: 4,
};

class Userform extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      fname: '',
      lname: '',
      email: '',
      contact: '',
      open: false,
    };
  }
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  
  render() {
    const { open } = this.state;
    return (
      <div>
        
 
      <Button onClick={this.handleOpen}>Open modal</Button>
        <Modal
          open={open}
          onClose={this.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
          <form onSubmit={this.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                name="fname"
                value={this.state.fname}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                name="lname"
                value={this.state.lname}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="contact"
                variant="outlined"
                fullWidth
                name="contact"
                value={this.state.contact}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Role"
                variant="outlined"
                fullWidth
                name="role"
                value={this.state.role}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender"
                value={this.gender}
                onChange={this.handleChange}
                row
              >
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>
          </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Add User
              </Button>
            </Grid>
          </Grid>
        </form>
      
          </Box>
        </Modal>

      </div>
    )
  }
}

export default Userform