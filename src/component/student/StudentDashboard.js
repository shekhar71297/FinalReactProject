import React, { Component } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Grid, Paper } from '@mui/material';
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
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import DialogBox from '../common/DialogBox';
import * as validation from '../../util/validation'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import './studentdashboard.css'
import * as TablePaginationActions from "../common/TablePaginationActions";
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  // marginTop:3,
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 700,
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
      pnr: '',
      branch: '',
      open: false,
      page: 0,
      rowsPerPage: 5,
      searchQuery: '',
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

  componentDidUpdate(prevProps) {
    if (prevProps.singelStudent !== this.props.singelStudent) {
      const { id, firstname, lastname, email, contact, dob, gender, organization, branch, pnr } = this.props.singelStudent;
      this.setState({
        id, firstname, lastname, email, contact, dob, gender, organization, branch, pnr
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


    if (id !== null) {
      this.getSingleRecord(id);
      this.setState({ open: true, isAddStudent: false });
    } else {
      this.setState({ open: true, isAddStudent: true });
      this.resetStudentFormHandler();
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
      severity: 'error',
      variant: "filled"
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

  updateStudent = (event) => {
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
        snackbarMessage: "Please fix the validation errors before submitting.",
        severity: 'error',
      });
      return; // Prevent submission
    }
    let sObj = {
      id: this.state.id,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      contact: this.state.contact,
      dob: this.state.dob,
      gender: this.state.gender,
      organization: this.state.organization,
      pnr: this.state.pnr,
      branch: this.state.branch

    }
    if (this.state.isAddStudent) {
      this.props.addStudentRequest(sObj);
      this.setState({
        snackbarOpen: true,
        snackbarMessage: 'Student added successfully',
        severity: 'success',
        variant: "filled"
      });
      this.props.initStudentRequest();

    } else {
      sObj['id'] = this.state.id;
      this.props.addStudentRequest(sObj);
      this.props.initStudentRequest()
      this.props.updateStudentRequest(sObj)
      this.setState({
        snackbarOpen: true,
        snackbarMessage: 'Student updated successfully',
        severity: 'success',
        variant: "filled"
      });

    }

    this.handleClose()
    this.props.initStudentRequest();

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
          branch: ""
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
        const isvalidContact = !(validation.isValidContact(this.state[name]));
        this.setState({ errors: { ...this.state.errors, contactError: isvalidContact } })

      }

      if (name === "pnr") {
        const isPnrError = !(validation.isValidPnr(this.state[name]));
        this.setState({ errors: { ...this.state.errors, pnrError: isPnrError } })

      }
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

  openDetailsPopup = (record) => {
    this.setState({ isDetailsPopupOpen: true, selectedRecord: record });
  };
  // Function to close the table
  closeDetailsPopup = () => {
    this.setState({ isDetailsPopupOpen: false, selectedRecord: "" });
  };





  render() {

    const { id, students, firstname, lastname, open, gender, organization, isDeletePopupOpen, selectedRecord, isDetailsPopupOpen, branch, pnr, email, contact, dob } = this.state;
    const isSubmitDisabled = !firstname || !lastname || !email || !contact || !dob || !gender || !branch && !pnr && !organization;
    const { searchQuery, page, rowsPerPage } = this.state;
    const filteredStudents = this.props.allstudent && this.props.allstudent.filter((data) => {
      const searchQuery = this.state.searchQuery.toLowerCase();


      const firstnameIncludes = data.firstname && data.firstname.toLowerCase().includes(searchQuery);
      const lastnameIncludes = data.lastname && data.lastname.toLowerCase().includes(searchQuery);
      const emailIncludes = data.email && data.email.toLowerCase().includes(searchQuery);
      const organizationIncludes = data.organization && data.organization.toLowerCase().includes(searchQuery);
      const contactIncludes = data.contact && data.contact.toLowerCase().includes(searchQuery);
      const dobIncludes = data.dob && data.dob.toLowerCase().includes(searchQuery);


      return firstnameIncludes || lastnameIncludes || emailIncludes || organizationIncludes || contactIncludes || dobIncludes;
    }) || [];


    return (
      <div className='container' style={{ marginRight: '25px', marginLeft: "-25px" }}>

        <Dialog open={isDetailsPopupOpen} onClose={this.closeDetailsPopup} fullWidth maxWidth="md" PaperProps={{
          sx: {
            width: '30%',
          },
        }}>
          <DialogTitle sx={{ backgroundColor: '#1976d2', color: 'white', fontSize: '28px' }}>Student Details</DialogTitle>
          {selectedRecord && (
            <DialogContent sx={{ fontSize: '23px', marginTop: "7px" }} >
              {/* Show the details of the selected record here */}
              <Typography  >
                <Typography component="span" variant="subtitle1" sx={{ fontSize: '23px', }} >
                  <span style={{ fontWeight: "bold" }}> Student Name:</span>
                  {selectedRecord.firstname} {selectedRecord.lastname} <br />
                </Typography>{" "}

                <Typography component="span" variant="subtitle1" sx={{ fontSize: '23px' }}>

                  <span style={{ fontWeight: "bold" }}> Email :</span>
                  {selectedRecord.email} <br />
                </Typography>{" "}

                <Typography component="span" variant="subtitle1" sx={{ fontSize: '23px' }}>

                  <span style={{ fontWeight: "bold" }}> Contact:</span>
                  {selectedRecord.contact} <br />
                </Typography>{" "}

                <Typography component="span" variant="subtitle1" sx={{ fontSize: '23px' }}>

                  <span style={{ fontWeight: "bold" }}>  DOB:</span>
                  {selectedRecord.dob} <br />
                </Typography>{" "}

                <Typography component="span" variant="subtitle1" sx={{ fontSize: '23px' }}>

                  <span style={{ fontWeight: "bold" }}>   Gender:</span>
                  {selectedRecord.gender} <br />
                </Typography>{" "}

                <Typography component="span" variant="subtitle1" sx={{ fontSize: '23px' }}>

                  <span style={{ fontWeight: "bold" }}>  Organizantion:</span>
                  {selectedRecord.organization} <br />
                </Typography>{" "}


              </Typography>

              <Typography>


                {selectedRecord.organization === 'cdac' ? (
                  // Display Pnr if the organization is cdac
                  <Typography component="span" variant="subtitle1" sx={{ fontSize: '23px' }}>
                    <span style={{ fontWeight: "bold" }}>Pnr:</span>
                    {selectedRecord.pnr} <br />
                  </Typography>
                ) : selectedRecord.organization === 'lighthouse' ? (
                  // Display Branch if the organization is lighthouse
                  <Typography component="span" variant="subtitle1" sx={{ fontSize: '23px' }}>
                    <span style={{ fontWeight: "bold" }}>Branch:</span>
                    {selectedRecord.branch} <br />
                  </Typography>
                ) : null}


              </Typography>
            </DialogContent>
          )}
          <DialogActions>
            <Button onClick={this.closeDetailsPopup} color="primary" sx={{ fontSize: "23px" }}>
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Box sx={{ height: 100 }}>
          {/* <Paper className='paper'> */}
          <TableContainer component={Paper} sx={{ marginTop: 5 }} >

            <Table aria-label="simple table">
              <TableHead>

                <TableRow >

                  <TableCell align="center" colSpan={10} sx={{ backgroundColor: '#1976d2', fontSize: "25px", fontWeight: "bolder", color: "white" }}>
                    <Grid className='resultheader' container alignItems="center" justifyContent="space-between" style={{ position: 'relative', overflow: "auto", top: 0, zIndex: 1, }}>
                      <Grid item>
                        Manage  Student
                      </Grid>
                      <Grid item>

                        <TextField
                          className='searchinput'
                          type="text"
                          value={searchQuery}
                          onChange={this.handleSearchChange}
                          placeholder="Search Student"
                          // label="Search Result"

                          variant="standard"
                          sx={{
                            backgroundColor: 'white',
                            padding: "2px 3px",
                            borderRadius: "4px",
                            width: "auto",

                          }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="end">
                                <SearchIcon />
                              </InputAdornment>
                            ),
                          }}

                        />
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>

                <Button variant="contained" color="primary" sx={{ marginTop: 2, marginLeft: 2 }} size="small" type="button" onClick={() => (this.handleOpen())}><AddIcon />Student</Button>
                <TableRow>
                  <TableCell align='center'><Typography component="span" variant="subtitle1" sx={{ fontWeight: 'bold' }}>SrNo</Typography></TableCell>
                  <TableCell align="center"><Typography component="span" variant="subtitle1" sx={{ fontWeight: 'bold' }}>Student's Name</Typography></TableCell>
                  {/* <TableCell align="center"><Typography component="span" variant="subtitle1" sx={{ fontWeight: 'bold' }}>Last Name</Typography></TableCell> */}
                  <TableCell align="center" ><Typography component="span" variant="subtitle1" sx={{ fontWeight: 'bold' }}>Email</Typography></TableCell>
                  <TableCell align="center"><Typography component="span" variant="subtitle1" sx={{ fontWeight: 'bold' }}>Contact</Typography></TableCell>
                  {/* <TableCell align="center"><Typography component="span" variant="subtitle1" sx={{ fontWeight: 'bold' }}>Dob</Typography></TableCell> */}
                  {/* <TableCell align="center"><Typography component="span" variant="subtitle1" sx={{ fontWeight: 'bold' }}>Gender</Typography></TableCell> */}
                  <TableCell align="center"><Typography component="span" variant="subtitle1" sx={{ fontWeight: 'bold' }}>Organization</Typography></TableCell>
                  <TableCell align="center"><Typography component="span" variant="subtitle1" sx={{ fontWeight: 'bold' }}>Action</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {filteredStudents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align='center'>
                      <strong style={{ fontSize: "34px" }}>No data found</strong>

                    </TableCell>
                  </TableRow>
                ) : (



                  filteredStudents && filteredStudents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((val, index) => {
                    const currentIndex = page * rowsPerPage + index + 1;
                    return <TableRow key={val.id}>
                      <TableCell align='center' component="th" scope="row">{currentIndex}</TableCell>
                      <TableCell align='center' >{val.firstname} {val.lastname}</TableCell >
                      {/* <TableCell align='center'>{val.lastname}</TableCell > */}
                      <TableCell align='center'>{val.email}</TableCell>
                      <TableCell align='center'>{val.contact}</TableCell>
                      {/* <TableCell align='center' >{val.dob}</TableCell> */}
                      {/* <TableCell align='center' >{val.gender}</TableCell> */}
                      <TableCell align='center' >{val.organization}</TableCell>

                      <TableCell align="center" style={{ fontSize: '5px' }}>
                        <Button onClick={() => this.openDetailsPopup(val)} align="cnter"><VisibilityIcon /></Button>
                        <Button onClick={() => this.handleOpen(val.id)} color="primary" ><EditIcon /></Button>
                        <Button onClick={() => this.deletedata(val.id)} color="primary"  ><DeleteIcon /></Button>
                      </TableCell>
                    </TableRow>

                  }) || [])}

              </TableBody>
            </Table>
          </TableContainer>
          <DialogBox
            open={isDeletePopupOpen}
            onClose={this.closeDeletePopup}
            onConfirm={() => {
              this.closeDeletePopup();
              this.handleDeleteConfirmed();
            }}
            message={`Are you sure you want to delete this record?`}
            title={`Delete Record`}
            submitLabel={`Delete`}

          />


          <Snackbar
            open={this.state.snackbarOpen}
            autoHideDuration={3000} // You can adjust the duration as needed
            onClose={() => this.setState({ snackbarOpen: false })}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}

          >
            <Alert onClose={() => this.setState({ snackbarOpen: false })} severity={this.state.severity} variant="filled" sx={{ width: '100%' }}>
              {this.state.snackbarMessage}

            </Alert>
          </Snackbar>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            colSpan={7} // Adjust the colSpan value according to your table structure
            count={filteredStudents.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: {
                'aria-label': 'rows per page',
              },
              native: true,
            }}
            onPageChange={this.handleChangePage}
            onRowsPerPageChange={this.handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions.default} // Imported component
          />
          {/* </Paper> */}
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
                  error={this.state.errors.fnameError}
                  helperText={this.state.errors.fnameError && validation.errorText("Please enter a valid firstname") || "eg:John"}
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
                  error={this.state.errors.lnameError}
                  helperText={this.state.errors.lnameError && validation.errorText("Please enter a valid last name") || 'eg: Doe'}
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
                error={this.state.errors.emailError}
                helperText={this.state.errors.emailError && validation.errorText("Please enter a valid email") || "eg:jhon@123"}
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
                error={this.state.errors.contactError}
                helperText={this.state.errors.contactError && validation.errorText("Please enter a valid contact") || "eg:99223344222"}
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
                  <FormControlLabel value="Other" checked={gender === "Other"} control={<Radio />} label="Transgender" />
                </RadioGroup>
              </FormControl>



              <FormControl fullWidth>
                <p style={{ marginLeft: "-450px" }}>Select Organization</p>
                <InputLabel id="demo-simple-select-label"></InputLabel>
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

                  >
                    <MenuItem value=''>Select Organizantion</MenuItem>
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
                    helperText={this.state.errors.pnrError && validation.errorText("Please enter a valid Pnr") || "eg:Hello-77"}
                  />
                )}

              </FormControl>


              <Button style={{ marginTop: "20px", marginRight: "15px" }} variant="contained" color="primary" type="submit" disabled={isSubmitDisabled}>Submit</Button>
              <Button style={{ marginTop: "20px", marginRight: "-352px" }} onClick={this.resetStudentFormHandler} variant="contained" color="secondary" type="button">Clear</Button>
            </form>
          </Box>
        </Modal>


      </div >
    )
  }
}


export default StudentDashboard;  