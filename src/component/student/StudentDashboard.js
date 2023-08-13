import React, { Component } from 'react'
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { getData, DeleteData, UpdateData, AddData } from '../../util/HttpService';
import * as constants from '../../util/Constant';
import { TextField, Button, Grid, Container, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import Box from '@mui/material/Box';
// import Button from '@mui/material';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import * as studentaction from '../../pages/student/action'
import { connect } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  overflow: 'auto',
  p: 4,
};


class StudentDashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      student: [],
      id: null,
      firstname: "",
      lastname: "",
      contact: "",
      gender: "",
      email: "",
      organization: '',
      page: 0,
      rowsPerPage: 5,
      open: false,
      searchQuery: "",
      isAddStudent: true
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
    // console.log(this.props.singelStudent)
  }
  // fetchData = () => {
  //   // e.preventDefault()
  //   // axios.get("http://localhost:8888/students").then((res) => {
  //   //   this.setState({ students: res.data });
  //   // })
  //   this.props.initStudentRequest()
  // }
   

  
  handleSearchQueryChange = (event) => {
    this.setState({ searchQuery: event.target.value, page: 0 });
  };

  // fetchData = () => {
  //   const url = `${constants.baseURL}/student`;
  //   getData(url).then((res) => {
  //     console.log(res.data);
  //     this.setState({ student: res.data });
  //   })
  // }

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10), page: 0 });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleOpen = (id = null) => {
    this.resetStudentFormHandler();

    if (id !== null) {
      this.getsinglerecord(id);
      this.setState({ open: true, isAddStudent: false });
    } else {
      this.setState({ open: true, isAddStudent: true });
    }



  };

  handleClose = () => {
    this.setState({ open: false });
  };
  deletedata = (id) => {
    
    if (window.confirm(`Are you sure to delete Recore data :${id}`)) {
      this.props.initStudentRequest()
      this.props.deleteStudentRequest(id)
      // let url = `${"http://localhost:8888/student"}/${id}`
      // const url = `${constants.baseURL}/student/${id}`;
      // DeleteData(url).then(() => {
      //   window.alert("Record delete succesfully");
      //   this.fetchData()
      // })

    }
  }
  getsinglerecord = (id) => {
    this.props.getSingleStudentRequest(id)

    // let url =`${get_student}/${id}`;
    // const url = `${constants.baseURL}/student/${id}`;
    // getData(url).then((res) => {
    //   console.log(res.data);
    //   const { student, id, fname, lname, password, email, role, gender, contact } = res.data;
    //   this.setState({ id, fname, lname, password, email, role, gender, contact });
    // })
  }

  resetStudentFormHandler = () => {
    this.setState({
      // student: [],
      id: null,
      firstname: "",
      lastname: "",
      contact: "",
      gender: "",
      email: "",
      organization: '',
      page: 0,
      rowsPerPage: 5,
      open: false,
      searchQuery: "",
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
      // AddData(url, sObj).then(() => {
      window.alert("Student added successfully")
      // })
    } else {
      sObj['id'] = this.state.id;
      this.props.initStudentRequest()
      this.props.updateStudentRequest(sObj)
      // const url = `${constants.baseURL}/user/${this.state.id}`;
      // console.log("update ", sObj);
      // UpdateData(url, sObj).then(() => {
      window.alert("Record updated successfully");
      //   this.fetchData();
      // })
    }


  }
  render() {
    // const { open, } = this.state;
    const { page, rowsPerPage, student, fname, open, lname, password, contact, email, gender, role } = this.state;
    console.log(this.props.allstudent);
    const filteredStudents = this.props.allstudent.map((data) => {
   return data ;
  //  const searchQuery = this.state.searchQuery;
      // const firstnameIncludes = data.firstname.toLowerCase().includes(searchQuery);
      // const lastnameIncludes = data.lastname.toLowerCase().includes(searchQuery);
      // const emailIncludes = data.email.toLowerCase().includes(searchQuery);
      // const dobIncludes = data.dob.toLowerCase().includes(searchQuery);
      // const organizationIncludes = data.organization.toLowerCase().includes(searchQuery);
      // return firstnameIncludes || lastnameIncludes || emailIncludes || dobIncludes || organizationIncludes;

    }
   
    );
    return (
      
      <div className='container'>
        <Box sx={{ height: 100 }}>
          <Paper sx={{ width: "100%", overflow: "hidden", position: "relative", right: "30px", top: "50px" }}>
            <Button variant="contained" color="primary" size="small" type="button" onClick={() => (this.handleOpen())}><AddIcon />Student</Button>&nbsp;
            <TextField
              label="Search.."
              variant="outlined"
              value={this.state.searchQuery}
              onChange={this.handleSearchQueryChange}
              width="200px"
              margin="normal"
            />

            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell >SrNo</TableCell>
                    <TableCell align="center">First Name</TableCell>
                    <TableCell align="center">Last Name</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Contact</TableCell>
                    <TableCell align="center">dob</TableCell>
                    <TableCell align="center">Gender</TableCell>
                    <TableCell align="center">Organization</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredStudents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, index) => {


                    return <TableRow key={index}>
                    
                      <TableCell component="th" scope="row">{index+1}</TableCell>
                      <TableCell align='center' >{data.firstname}</TableCell >
                      <TableCell align='center'>{data.lastname}</TableCell >
                      <TableCell align='center'>{data.email}</TableCell>
                      <TableCell align='center'>{data.contact}</TableCell>
                      <TableCell align='center' >{data.dob}</TableCell>
                      <TableCell align='center' >{data.gender}</TableCell>
                      <TableCell align='center' >{data.organization}</TableCell>
                      <TableCell align="center" >

                        <Button color="primary" size="small" type="button" onClick={() => (this.handleOpen(data.id))}><EditIcon /></Button>&nbsp;
                        <Button color="primary" size="small" type="button" onClick={() => this.deletedata(data.id)}><DeleteIcon /></Button>
                      </TableCell>

                    </TableRow>




                  })}

                </TableBody>

              </Table>
              <TablePagination

                component="div"
                rowsPerPageOptions={[3, 10, 25]}
                count={filteredStudents.length}

                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={this.handleChangePage}
                onRowsPerPageChange={this.handleChangeRowsPerPage}
              />
            </TableContainer>

          </Paper>
        </Box>

        <Modal
          open={open}
          onClose={this.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} >
            <form onSubmit={this.updatestudent}>
              <Grid container spacing={2}>
                <Grid item xs={12} >
                  <TextField
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    name="fname"
                    value={this.state.firstname}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    name="lname"
                    value={this.state.lastname}
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
                    label="Organization"
                    variant="outlined"
                    fullWidth
                    name="organization"
                    value={this.state.organization}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup
                      aria-label="gender"
                      name="gender"
                      value={gender}
                      onChange={this.handleChange}
                      row
                    >
                      <FormControlLabel value="male" checked={gender === "male"} control={<Radio />} label="Male" />
                      <FormControlLabel value="female" checked={gender === "female"} control={<Radio />} label="Female" />
                      <FormControlLabel value="other" checked={gender === "other"} control={<Radio />} label="Other" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    {this.state.isAddStudent ? "Add Student" : "Update Student"}
                  </Button>
                  <Button type="button" onChange={this.handleClose} variant="contained" color="primary">cancel</Button>
                </Grid>
              </Grid>
            </form>

          </Box>
        </Modal>



      </div >
    )
  }
}

const mapStateToProps = (state) => ({
  allstudent: state.studentStore.allstudent,
  singleStudent: state.studentStore.student
});

const mapDispatchToProps = (dispatch) => ({
  initStudentRequest: () => dispatch(studentaction.getAllStudent()),
  updateStudentRequest: (id) => dispatch(studentaction.updateAllStudent(id)),
  addStudentRequest: (data) => dispatch(studentaction.addAllStudent(data)),
  deleteStudentRequest: (id) => dispatch(studentaction.deleteAllStudent(id)),
  getSingleStudentRequest: (id) => dispatch(studentaction.getsingleStudent(id))

})

export default connect(mapStateToProps, mapDispatchToProps)(StudentDashboard);