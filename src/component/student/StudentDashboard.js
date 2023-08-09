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
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Button } from '@mui/material'
import Stack from '@mui/material/Stack';
import { Link } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import * as Student from '../../pages/student/action'
import { connect } from 'react-redux';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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
      open: false,
      page: 0,
      rowsPerPage: 5,
      searchQuery: '',
      isAddStudent:true
      // page: 10
    }
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.singelStudent !== this.props.singelStudent) {
      const { id, firstname, lastname, email, contact, dob, gender, organization } = this.props.singelStudent;
      this.setState({
        id, firstname, lastname, email, contact, dob, gender, organization
      })
    }
    
  }
  componentDidMount() {
    this.props.initStudentRequest()
    console.log(this.props.singelStudent)
  }
  // fetchData = () => {
  //   // e.preventDefault()
  //   // axios.get("http://localhost:8888/students").then((res) => {
  //   //   this.setState({ students: res.data });
  //   // })
  //   this.props.initStudentRequest()
  // }
   
  
  getSingleRecord = (id) => {
    // let url = `${"http://localhost:8888/students"}/${id}`;
    this.props.getSingleStudentRequest(id);
    // axios.get(url).then((res) => {
    //   console.log(res.data);
    //   const { students, id, firstname, lastname, email, contact, dob, gender, organization} = res.data;

    //   this.setState({ id, firstname, lastname, email, contact, dob, gender, organization });
    // })
  }


  // updateStudent = (event) => {
  //   event.preventDefault();
  //   // let url = `${"http://localhost:8888/students"}/${this.state.id}`;
  //   let sObj = {
  //     id: this.state.id,
  //     firstname: this.state.firstname,
  //     lastname: this.state.lastname,
  //     email: this.state.email,
  //     contact: this.state.contact,
  //     dob: this.state.dob,
  //     gender: this.state.gender,
  //     organization: this.state.organization,

  //   }
  //   // axios.put(url, sObj).then(() => {
  //   this.props.updateAllStudent(sObj)
  //   window.alert("Record Update Sucessfully");
  //   // this.fetchData();
  //   // })
  // }


  // handleOpen = (id) => {
  //   this.setState({ open: true });
  //   this.getSingleRecord(id)
  //   // this.props.getSingleStudentRequest(id)

  // };
handleOpen = (id = null) => {
    this.resetStudentFormHandler();

    if (id !== null) {
      this.getSingleRecord(id);
      this.setState({ open: true, isAddStudent: false });
    } else {
      this.setState({ open: true, isAddStudent: true });
    }



  };

  handleClose = () => {
    this.setState({ open: false });
  };




  deleteRecord = (id) => {
    if (window.confirm(`Are you sure? you want to remove Student: `)) {
      // let url = `${"http://localhost:8888/students"}/${id}`
      // axios.delete(url).then(() => {
      this.props.deleteStudentRequest(id)
      window.alert("Student Deleted successfully")
      // this.fetchData()

      // })
    }

  }
  addRecord = (event)=>{
    event.preventDefault();
    axios.post("http://localhost:8888/students",this.state).then(()=>{
        window.alert("Student data added successfully ")
    })
}
resetStudentFormHandler = () => {
  this.setState({
    // user: [],
    id: null,
    fname: "",
    lname: "",
    role: "",
    password: "",
    contact: "",
    gender: "",
    email: "",
    // page: 0,
    // rowsPerPage: 10,
    // open: false,
    // singlerecord: ""
  })
}

updateStudent = (event) => {
  event.preventDefault();
  let sObj = {
    id: this.state.id,
    firstname: this.state.firstname,
    lastname: this.state.lastname,
    email: this.state.email,
    contact: this.state.contact,
    dob: this.state.dob,
    gender: this.state.gender,
    organization: this.state.organization,

  }
  if (this.state.isAddStudent) {
    this.props.addStudentRequest(this.state);
    // const url = `${constants.baseURL}/user`;
    // console.log("add ", sObj);
    // AddData(url, pobj).then(() => {
    window.alert("Student added successfully")
    // })
  } else {
    sObj['id'] = this.state.id;
    this.props.initStudentRequest()
    this.props.updateStudentRequest(sObj)
    // const url = `${constants.baseURL}/user/${this.state.id}`;
    // console.log("update ", sObj);
    // UpdateData(url, pobj).then(() => {
    window.alert("Record updated successfully");
    //   this.fetchData();
    // })
  }




}


  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10), page: 0 });
  };

  handleSearchChange = (event) => {
    this.setState({ searchQuery: event.target.value, page: 0 });
  }


  render() {
    const { students, open, dob, contact, email, gender, organization } = this.state;
    const { searchQuery, page, rowsPerPage } = this.state;

    const filteredStudent = this.props.allstudent.filter((val) =>{
      const searchQuery = this.state.searchQuery;
    const firstnameIncludes = val.firstname.toLowerCase().includes(searchQuery);
    const lastnameIncludes = val.lastname.toLowerCase().includes(searchQuery);
    const emailIncludes = val.email.toLowerCase().includes(searchQuery);
    // const statusIncludes = status.toLowerCase().includes(searchQuery);
    const dobIncludes = val.dob.toLowerCase().includes(searchQuery);
    const organizationIncludes = val.organization.toLowerCase().includes(searchQuery);
      return firstnameIncludes || lastnameIncludes || emailIncludes || dobIncludes ||
      organizationIncludes 
    } );
    return (
      <div className='container'>
         <Button variant="contained" color="primary" size="small" type="button" onClick={() => (this.handleOpen())}><AddIcon/>Student</Button>
                  <input style={{position:'relative' , right:"30%" , padding:"7px", margin:"7px", border:"2px solid "}}
          type="text"
          value={searchQuery}
          onChange={this.handleSearchChange}
          placeholder="Search Here"
        />

        <Box sx={{ height: 100 }}>
          <Paper sx={{ width: "100%", overflow: "hidden", position: "relative", right: "30px", top: "50px" }}>

            <TableContainer  >
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell  >SrNo</TableCell>
                    <TableCell align="center">First Name</TableCell>
                    <TableCell align="center">Last Name</TableCell>
                    <TableCell align="center" >Email</TableCell>
                    <TableCell align="center">contact</TableCell>
                    <TableCell align="center">dob</TableCell>
                    <TableCell align="center">Gender</TableCell>
                    <TableCell align="center">organization</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  {filteredStudent.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((val,index) => {
                    return <TableRow key={val.id}>
                      <TableCell component="th" scope="row">{index+1}</TableCell>
                      <TableCell align='center' >{val.firstname}</TableCell >
                      <TableCell align='center'>{val.lastname}</TableCell >
                      <TableCell align='center'>{val.email}</TableCell>
                      <TableCell align='center'>{val.contact}</TableCell>
                      <TableCell align='center' >{val.dob}</TableCell>
                      <TableCell align='center' >{val.gender}</TableCell>
                      <TableCell align='center' >{val.organization}</TableCell>

                      <TableCell align="center">
                        {/* 
                    <button onClick={() => this.handleOpen(val.id)} className='btn btn-outline-primary btn-lg'  variant="contained" color="primary"
                    ><i class="fa fa-ban" aria-hidden="true"></i>Edit</button>
                    &nbsp;
                    <button onClick={() => this.deleteRecord(val.id)} className='btn btn-outline-danger btn-lg' variant="contained" color="secondary"
                    ><i class="fa fa-ban" aria-hidden="true"></i>Delete</button> */}

                        <Button type="button" onClick={() => this.handleOpen(val.id)} color="primary" ><EditIcon /></Button>&nbsp;
                        <Button type="button" onClick={() => this.deleteRecord(val.id)} color="primary"  ><DeleteIcon /></Button>
                      </TableCell>
                    </TableRow>

                  })}

                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 35, 50]}
              component="div"
              count={filteredStudent.length} // Use the filtered results length for pagination
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={this.handleChangePage}
              onRowsPerPageChange={this.handleChangeRowsPerPage}
            />
          </Paper>
        </Box>


        <Modal
          open={open}
          onClose={this.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={style}>
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
                // checked={dob === "dob"}
                value={this.state.dob}
                name='dob'
                fullWidth
                required
                sx={{ mb: 4 }}
              />

              <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  aria-label='="gender'
                  name="gender"
                  value={this.state.gender}
                  onChange={this.handleChange}
                  row
                >
                  <FormControlLabel value="Male" checked={gender === "Male"} control={<Radio />} label="Male" />
                  <FormControlLabel value="Female" checked={gender === "Female"} control={<Radio />} label="Female" />
                  <FormControlLabel value="Other" checked={gender === "Other"} control={<Radio />} label="Other" />
                </RadioGroup>
              </FormControl>


              <FormControl component="fieldset">
                <FormLabel component="legend">Organization</FormLabel>
                <RadioGroup
                  aria-lable="organization"
                  value={this.state.organization}
                  onChange={this.handleChange}
                  row
                  // aria-labelledby="demo-row-radio-buttons-group-label"
                  name="organization" >
                  <br /><br />
                  <FormControlLabel value="hematite" checked={organization === "hematite"} control={<Radio />} label="Hematite" />
                  <FormControlLabel value="Lighthouse" checked={organization === "Lighthouse"} control={<Radio />} label="Lighthouse" />
                  <FormControlLabel value="Cdac" checked={organization === "Cdac"} control={<Radio />} label="Cdac" />
                </RadioGroup>
              </FormControl>

              <Button style={{ marginTop: "20px", marginRight: "15px" }} variant="contained" color="primary" type="submit">Submit</Button>
              <Button style={{ marginTop: "20px", marginRight: "-352px" }} variant="contained" color="secondary" type="resrt">Clear</Button>
            </form>
          </Box>
        </Modal>
      </div>


    );
  }
}
const mapStateToProps = (state) => ({
  allstudent: state.StudentStore.allstudent,
  singelStudent: state.StudentStore.student
})

const mapDispatchToprops = (dispatch) => ({
  initStudentRequest: () => dispatch(Student.getAllStudent()),
  deleteStudentRequest: (id) => dispatch(Student.deleteAllStudent(id)),
  updateStudentRequest: (id) => dispatch(Student.updateAllStudent(id)),
  getSingleStudentRequest: (id) => dispatch(Student.getsingleStudent(id)),
  addStudentRequest:(data)=>dispatch(Student.addAllStudent(data))
})
export default connect(mapStateToProps, mapDispatchToprops)(StudentDashboard)