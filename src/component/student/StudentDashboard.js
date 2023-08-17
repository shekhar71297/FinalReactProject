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
import { connect } from 'react-redux'
import * as Action from '../../pages/student/action'
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import {  DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';


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
      isAddStudent:true,
      isDeletePopupOpen: false,
      deletingRecordId: null,
      isDetailsPopupOpen: false,
      selectedRecord: "",
      snackbarOpen: false,
      snackbarMessage: ''

    
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
    
  }
 
  
  getSingleRecord = (id) => {
    
    this.props.getSingleStudentRequest(id);
  
  }


  
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


// delete action 
  // Function to open the delete popup model
  openDeletePopup = (id) => {
    this.setState({ isDeletePopupOpen: true, deletingRecordId: id });
  };

  // Function to close the delete popup model
  closeDeletePopup = () => {
    this.setState({ isDeletePopupOpen: false, deletingRecordId: null });
  };

  // Delete action
  deletedata = (id) => {
    this.openDeletePopup(id);
  };

  // Function to handle the actual delete action after user confirmation
  handleDeleteConfirmed = () => {
    const { deletingRecordId } = this.state;
    
    this.props.deleteStudentRequest(deletingRecordId);
    this.closeDeletePopup();

    this.setState({
      snackbarOpen: true,
      snackbarMessage: 'Student deleted successfully',
    });

  
  };

  
resetStudentFormHandler = () => {
  this.setState({
    students: [],
    id: null,
    fname: "",
    lname: "",
    role: "",
    password: "",
    contact: "",
    gender: "",
    email: ""
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
    this.props.addStudentRequest(sObj);
    this.setState({
      snackbarOpen: true,
      snackbarMessage: 'Student added successfully',
    });
    
  
  } else {
    sObj['id'] = this.state.id;
    this.props.initStudentRequest()
    this.props.updateStudentRequest(sObj)
    this.setState({
      snackbarOpen: true,
      snackbarMessage: 'Student updated successfully',
    });
    this.handleClose()
    
    
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

    const {id, students,firstname,lastname, open, gender, organization ,isDeletePopupOpen} = this.state;
    const { searchQuery, page, rowsPerPage } = this.state;
    const filteredStudents = this.props.allstudent && this.props.allstudent.filter((data) => {
      const searchQuery = this.state.searchQuery.toLowerCase(); 
    
    
      const firstnameIncludes = data.firstname && data.firstname.toLowerCase().includes(searchQuery);
      const lastnameIncludes = data.lastname && data.lastname.toLowerCase().includes(searchQuery);
      const emailIncludes = data.email && data.email.toLowerCase().includes(searchQuery);
      const organizationIncludes = data.organization && data.organization.toLowerCase().includes(searchQuery);
    
      return firstnameIncludes || lastnameIncludes || emailIncludes || organizationIncludes;
    }) || [];
    
        
    return (

      <div className='container'>
       
       <Box sx={{ height: 100 }}>
          <Paper sx={{ width: "100%", overflow: "hidden", position: "relative", right: "30px", top: "50px" }}>
          <Button variant="contained" color="primary" size="small" type="button" onClick={() => (this.handleOpen())}><AddIcon/>Student</Button>
                  <input style={{position:'relative' , right:"30%" , padding:"7px", margin:"7px", border:"2px solid "}}
          type="text"
          value={searchQuery}
          onChange={this.handleSearchChange}
          placeholder="Search Here"
        />
            <TableContainer  >
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" >SrNo</TableCell>
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

                  {filteredStudents && filteredStudents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((val,index) => {
                     const currentIndex = page * rowsPerPage + index + 1;
                    return <TableRow key={val.id}>
                      <TableCell component="th" scope="row">{currentIndex}</TableCell>
                      <TableCell align='center' >{val.firstname}</TableCell >
                      <TableCell align='center'>{val.lastname}</TableCell >
                      <TableCell align='center'>{val.email}</TableCell>
                      <TableCell align='center'>{val.contact}</TableCell>
                      <TableCell align='center' >{val.dob}</TableCell>
                      <TableCell align='center' >{val.gender}</TableCell>
                      <TableCell align='center' >{val.organization}</TableCell>

                      <TableCell align="center">
                    

                        <Button type="button" onClick={() => this.handleOpen(val.id)} color="primary" ><EditIcon /></Button>&nbsp;
                        <Button type="button" onClick={() => this.deletedata(val.id)} color="primary"  ><DeleteIcon /></Button>
                      </TableCell>
                    </TableRow>

                  }) || []}

                </TableBody>
              </Table>
            </TableContainer>
            {/* Delete Popup Model */}
            <Dialog open={isDeletePopupOpen} onClose={this.closeDeletePopup}>
              <DialogTitle>Delete Record</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to delete this record?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.closeDeletePopup} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.handleDeleteConfirmed} color="primary" autoFocus>
                  Delete
                </Button>
              </DialogActions>
            </Dialog>

            <Snackbar
              open={this.state.snackbarOpen}
              autoHideDuration={3000} // You can adjust the duration as needed
              onClose={() => this.setState({ snackbarOpen: false })}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <Alert onClose={() => this.setState({ snackbarOpen: false })} severity="success" sx={{ width: '100%' }}>
                {this.state.snackbarMessage}
              </Alert>
            </Snackbar>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 35, 50]}
              component="div"
              count={filteredStudents.length} // Use the filtered results length for pagination
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
            <form onSubmit={this.updateStudent} >
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
                onChange={this.handleChange}
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


      </div >
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
  addStudentRequest:(data)=>dispatch(Action.addAllStudent(data))
})


export default connect(mapStateToProps,mapDispatchToprops)(StudentDashboard);  