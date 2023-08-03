import React, { Component } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow'; 
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
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
// import Button from '@mui/material/FormLabel';
import Form from 'react'
// import Button from '@mui/material/Button';
import { Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { Link } from '@mui/material';
// import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
// import '../node_modules/font-awesome/css/font-awesome.min.css'
  
export class StudentDashboard extends Component {
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
    
    componentDidMount() {
        this.fetchData();
        
    } 
    
    fetchData = () => {
      // e.preventDefault()
        axios.get("http://localhost:8888/students").then((res) => {
            this.setState({ students: res.data });
        })
    }

    getSingleRecord =(id)=>{
      let url =`${"http://localhost:8888/students"}/${id}`;
      axios.get(url).then((res)=>{
        console.log(res.data);
        const {students,id,firstname,lastname,email,contact,dob,gender,organization} = res.data;

        this.setState({id,firstname,lastname,email,contact,dob,gender,organization});
      })
    }


      updateStudent =(event)=>{
      event.preventDefault();
      let url =`${"http://localhost:8888/students"}/${this.state.id}`;
      let sObj ={
        id: this.state.id,
        firstname:this.state.firstname,
        lastname:this.state.lastname,
        email:this.state.email,
        contact:this.state.contact,
        dob:this.state.dob,
        gender:this.state.gender,
        organization:this.state.organization,
  
      }
      axios.put(url,sObj).then(()=>{
        window.alert("Record Update Sucessfully");
        this.fetchData();
      })
    }


  // handleChangePage = (event, newPage) => {
  //   event.preventDefault(event)
  //   this.setState({ page: newPage });
  // };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: +event.target.value, page: 0 });
  };

  
  deleteRecord = (id) => {
    if (window.confirm(`Are you sure? you want to remove Student: `)) {
        let url = `${"http://localhost:8888/students"}/${id}`
        axios.delete(url).then(() => {
            window.alert("Student Deleted successfully")
            this.fetchData()
           
        })

        // this.props.initProductRequest()
        // this.props.deleteProductRequest(id)
        // window.alert("Student Deleted successfully")

    }


}


handleChange = (event) => {
  this.setState({
    [event.target.name]: event.target.value
  });
};

  render() {
    const { page, rowsPerPage,students} = this.state;

    return (
<div className='container'>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell  >SrNo</TableCell>
                                <TableCell  align="center">First Name</TableCell>
                                <TableCell  align="center">Last Name</TableCell>
                                <TableCell align="center" >Email</TableCell>
                                <TableCell align="center">contact</TableCell>
                                <TableCell align="center">dob</TableCell>
                                <TableCell align="center">Gender</TableCell>
                                <TableCell align="center">organization</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                         
                         {students.map((val) => {
                                return <TableRow key={val.id}>
                                    <TableCell component="th" scope="row">{val.id}</TableCell>
                                     <TableCell align='center' >{val.firstname}</TableCell >
                                     <TableCell align='center'>{val.lastname}</TableCell >
                                     <TableCell align='center'>{val.email}</TableCell>
                                     <TableCell align='center'>{val.contact}</TableCell>
                                     <TableCell align='center' >{val.dob}</TableCell>
                                     <TableCell align='center' >{val.gender}</TableCell>
                                     <TableCell align='center' >{val.organization}</TableCell>
                                     <TableCell align="right">

                                     <button onClick={()=>this.getSingleRecord(val.id)} className='btn btn-outline-danger btn-lg'
                                       ><i class="fa fa-ban" aria-hidden="true"></i>Edit</button>
                                        &nbsp;
                                      <button onClick={()=>this.deleteRecord(val.id)} className='btn btn-outline-danger btn-lg'
                                       ><i class="fa fa-ban" aria-hidden="true"></i>Delete</button>
                                       </TableCell> 
                            </TableRow>                   
                              
                            })}
                             
                        </TableBody>



                    </Table>
                    <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 25]}
          count={students.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={this.handleChangePage}
          onRowsPerPageChange={this.handleChangeRowsPerPage}
        />
                </TableContainer>
                

          //Edit Operation

                <form onSubmit={this.updateStudent} action={<Link to="" />}>
                <Stack spacing={2} direction="row" >

                            
                  <TextField
                    type="text"
                    variant='outlined'
                    color='secondary'
                    label="First Name"
                    onChange={this.handleChange}
                    value={this.state.firstname}
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
                    value={this.state.lastname}
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
                  value={this.state.email}
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
                  value={this.state.contact}
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
                  value="data.dob"
                  name='dob'
                  fullWidth
                  required
                  sx={{ mb: 4 }}
                />
             
                <FormControl fullWidth>
                  <p style={{marginLeft: "-490px"}}>Select Gender</p>
                    <InputLabel id="demo-simple-select-label"></InputLabel>
                    {/* <br /> */}
                  <RadioGroup
                        value={this.gender}
                        onChange={this.handleChange}
                        row
                         aria-labelledby="demo-row-radio-buttons-group-label"
                        name="gender"
                      >
                       <br /><br />
                        <FormControlLabel value="male"  checked={this.state.gender === "Male"} control={<Radio />} label="Male" />
                        <FormControlLabel value="female"  checked={this.state.gender === "Female"} control={<Radio />} label="Female" />
                        <FormControlLabel value="other"  checked={this.state.gender === "Other"} control={<Radio />} label="Other" />
                  </RadioGroup>
                    {/* <br /> */}
                </FormControl>
                {/* <br /> */}
                <FormControl fullWidth>
                <p style={{marginLeft: "-450px"}}>Select Organization</p>
                  <InputLabel id="demo-simple-select-label"></InputLabel>
                  <RadioGroup
                        onChange={this.handleChange}
                        value={this.organization}
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="organization"
                      >
                       <br /><br />
                        <FormControlLabel value="hemaitite"   checked={this.state.organization === "hematite"} control={<Radio />} label="Hemaitie" />
                        <FormControlLabel value="lighthouse" checked={this.state.organization === "lighthouse"} control={<Radio />} label="Lighthouse" />
                        <FormControlLabel value="cdac"  checked={this.state.organization === "cdac"}control={<Radio />} label="Cdac" />
                  </RadioGroup>
                  
                </FormControl>
       
                <Button style={{ marginTop: "20px", marginRight:"15px" }} variant="contained" color="primary" type="submit">Submit</Button>
                <Button style={{ marginTop: "20px",marginRight: "-352px" }} variant="contained" color="secondary" type="resrt">Clear</Button>
              </form>
            </div>
       
    );
  }
}
export default StudentDashboard