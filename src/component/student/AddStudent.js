import React, { Component } from 'react';
import axios from 'axios';

 class Add1 extends Component {
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
            term: false,
        }
    }

    addRecord = (event)=>{
        event.preventDefault();
        axios.post("http://localhost:8888/students",this.state).then(()=>{
            window.alert("Student data added successfully ")
        })
    }

    handleChange =(event)=>{
        const{name,value}=event.target;
        this.setState({[name]:value});
    }
    render() {
        const{students,firstname,lastname,email,contact,gender,dob,organization}=this.state;
        return (
            <div>
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
          <form onSubmit={this.addRecord} action={<Link to="" />}>
            <Stack spacing={2} direction="row" >

              <TextField
                type="text"
                variant='outlined'
                color='secondary'
                label="First Name"
                onChange={this.handleChange}
                value={firstname}
                name='firstname'
                error
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
                error
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
              error
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
              error
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
              error
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

              { this.state.organization==='cdac'&&  <TextField id="standard-basic"  variant="standard"
                name='organization'
                placeholder='pnr'
                value={organization}
                onChange={this.handleChange} /> 
              }

            </FormControl>

            <Button style={{ marginTop: "20px", marginRight: "15px" }} variant="contained" color="primary" type="submit">Submit</Button>
            {/* <button type='submit' className='btn btn-primary mt-2'>Submit</button> */}
          </form>

        </div>
      </Box>
            </div>
        )
    }
}

export default Add1
