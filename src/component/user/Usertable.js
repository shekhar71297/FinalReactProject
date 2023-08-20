import React, { Component } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { TextField, Button, Grid, MenuItem, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import * as TablePaginationActions from "../common/TablePaginationActions"

import './usertable.css'

import * as validation from '../../util/validation';




class Usertable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: [],
      id: null,
      fname: "",
      lname: "",
      role: "",
      password: "",
      contact: "",
      gender: "",
      email: "",
      page: 0,
      rowsPerPage: 5,
      open: false,
      searchQuery: "",
      isAddUser: true,
      confirmDialogOpen: false,
      recordToDeleteId: null,
      snackbarOpen: false,
      snackbarMessage: '',
      errors:{
        fnameError:false,
        lnameError:false,
        contactError:false,
        emailError:false,
        passwordError:false
      },
      showPassword: false
    }
  }


  componentDidUpdate(prevProps) {

    if (prevProps.singleUser !== this.props.singleUser) {
      const { id, fname, lname, role, password, contact, gender, email } = this.props.singleUser;
      this.setState({
        id, fname, lname, role, password, contact, gender, email
      })
    }
  }
  componentDidMount() {
    this.props.initUserRequest();
  }

  //search function
  handleSearchQueryChange = (event) => {
    this.setState({ searchQuery: event.target.value, page: 0 });
  };
  //  pagination function
  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10), page: 0 });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => {
      if(name === "fname"){
        const isFnameError = !(validation.isValidName(this.state[name]));
        if(isFnameError){
          this.setState({errors:{...this.state.errors,fnameError:true}})
        }else{
          this.setState({errors:{...this.state.errors,fnameError:false}})
        }
      }

      if(name === "lname"){
        const isLnameError = !(validation.isValidName(this.state[name]));
        if(isLnameError){
          this.setState({errors:{...this.state.errors,lnameError:true}})
        }else{
          this.setState({errors:{...this.state.errors,lnameError:false}})
        }
      }

      if(name === "contact"){
        const isContactError = !(validation.isValidContact(this.state[name]));
        if(isContactError){
          this.setState({errors:{...this.state.errors,contactError:true}})
        }else{
          this.setState({errors:{...this.state.errors,contactError:false}})
        }
      }

      if(name === "email"){
        const isEmailError = !(validation.isValidEmail(this.state[name]));
        if(isEmailError){
          this.setState({errors:{...this.state.errors,emailError:true}})
        }else{
          this.setState({errors:{...this.state.errors,emailError:false}})
        }
      }

      if(name === "password"){
        const isPasswordError = !(validation.isValidPassword(this.state[name]));
        if(isPasswordError){
          this.setState({errors:{...this.state.errors,passwordError:true}})
        }else{
          this.setState({errors:{...this.state.errors,passwordError:false}})
        }
      }
    });
    
  }



  //to popup
  handleOpen = (id = null) => {
    this.resetUserFormHandler();

    if (id !== null) {
      this.getsinglerecord(id);
      this.setState({ open: true, isAddUser: false });
    } else {
      this.setState({ open: true, isAddUser: true });
    }

  };

  handleClose = () => {
    this.setState({ open: false });
  };

  // delete action
  confirmDelete = () => {
    const id = this.state.recordToDeleteId;
    this.props.initUserRequest();
    this.props.deleteUserRequest(id);
    this.closeConfirmDialog();
    this.setState({
      snackbarOpen: true,
      snackbarMessage: 'User deleted successfully',
    });
  };

  deletedata = (id) => {
    this.openConfirmDialog(id);
  };

  openConfirmDialog = (id) => {
    this.setState({
      confirmDialogOpen: true,
      recordToDeleteId: id,

    });
  };

  closeConfirmDialog = () => {
    this.setState({
      confirmDialogOpen: false,
      recordToDeleteId: null,
    });
  };

  // single record 
  getsinglerecord = (id) => {
    this.props.getSingleUserRequest(id)
  }

  // update and add actions
  resetUserFormHandler = () => {
    this.setState({
      id: null,
      fname: "",
      lname: "",
      role: "",
      password: "",
      contact: "",
      gender: "",
      email: "",

    })
  }

  updateuser = (event) => {
    event.preventDefault();

    let uobj = {
      email: this.state.email,
      fname: this.state.fname,
      lname: this.state.lname,
      password: this.state.password,
      role: this.state.role,
      gender: this.state.gender,
      contact: this.state.contact,
    };
    if (this.state.isAddUser) {
      this.props.addUserRequest(uobj);
      this.setState({
        snackbarOpen: true,
        snackbarMessage: 'User added successfully',
      });
    } else {
      uobj['id'] = this.state.id;
      this.props.initUserRequest();
      this.props.updateUserRequest(uobj);
      this.setState({
        snackbarOpen: true,
        snackbarMessage: 'User updated successfully',
      });
    }
    this.handleClose();
  };
   
  // close alert message 
  closeSnackbar = () => {
    this.setState({
      snackbarOpen: false,
      snackbarMessage: '',
    });
  };

 
  render() {

    const { page, rowsPerPage, user, fname, open, lname, password, contact, email, gender, role } = this.state;
    const filteredUsers = this.props.allUser.filter((data) => {

      const searchQuery = this.state.searchQuery;
      const fnameIncludes = data.fname.toLowerCase().includes(searchQuery)
      const lnameIncludes = data.lname.toLowerCase().includes(searchQuery)
      const emailIncludes = data.email.toLowerCase().includes(searchQuery)
      const roleIncludes = data.role.toLowerCase().includes(searchQuery)
      const genderIncludes = data.gender.toLowerCase().includes(searchQuery)

      return fnameIncludes || lnameIncludes || emailIncludes || roleIncludes || genderIncludes
    }
    );
    return (

      <div>
        {/* add button */}
        <Button variant="contained" color="primary" size="small" className='addbtn' type="button" onClick={() => (this.handleOpen())}><AddIcon />User</Button>&nbsp;

        {/* search field  */}
        <TextField
          label="Search.."
          variant="outlined"
          value={this.state.searchQuery}
          onChange={this.handleSearchQueryChange}
          className='search'
          sx={{ paddingBottom: 4 }}
        />

        {/* User table  */}
        <Box sx={{ height: 100 }}>
          <Paper className='paper'>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={8} sx={{ color: "white", backgroundColor: "#1976d2", fontSize: "25px", textAlign: "start", fontWeight: "bolder" }}>
                      Manage User
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>SrNo</TableCell>
                    <TableCell align="center">First Name</TableCell>
                    <TableCell align="center">Last Name</TableCell>
                    <TableCell align="center">Email</TableCell>
                    {/* <TableCell align="center">Password</TableCell> */}
                    <TableCell align="center">Role</TableCell>
                    <TableCell align="center">Gender</TableCell>
                    <TableCell align="center">Contact</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} align='center'>
                        <strong style={{ fontSize: "34px" }}>No data found</strong>

                      </TableCell>
                    </TableRow>
                  ) : (


                    filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, index) => {
                      const currentIndex = page * rowsPerPage + index + 1;

                      return (<TableRow key={index}>
                        <TableCell component="th" scope="row">{currentIndex}</TableCell>
                        <TableCell className="tablebody" align="center">{data.fname}</TableCell >
                        <TableCell className="tablebody" align="center">{data.lname}</TableCell >
                        <TableCell className="tablebody" align="center">{data.email}</TableCell>

                        {/* <TableCell className="tablebody" align="center">{data.password}</TableCell> */}
                        <TableCell className="tablebody" align="center">{data.role}</TableCell>
                        <TableCell className="tablebody" align="center">{data.gender}</TableCell>
                        <TableCell className="tablebody" align="center">{data.contact}</TableCell>

                        <TableCell className="tablebody" align="center" >
                          <Button onClick={() => (this.handleOpen(data.id))}><EditIcon /></Button>
                          <Button onClick={() => this.deletedata(data.id)}><DeleteIcon /></Button>
                        </TableCell>

                      </TableRow>
                      )
                    })
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={7} // Adjust the colSpan value according to your table structure
              count={filteredUsers.length}
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

          </Paper>
        </Box>

        {/* popup update and add  */}
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="dialog-title"
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle id="dialog-title" sx={{ color: "white", backgroundColor: "#1976d2", fontWeight: "bolder" }}>
            {this.state.isAddUser ? 'Add User' : 'Update User'}
          </DialogTitle>
          <form onSubmit={this.updateuser}>
            <DialogContent>

              <Grid container spacing={2}>
                <Grid item xs={12} >
                  <TextField
                    required
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    name="fname"
                    type="text"
                    value={fname}
                    onChange={this.handleChange}
                     error={this.state.errors.fnameError 
                    }
                    helperText={this.state.errors.fnameError && validation.errorText("Please enter a valid first name") ||'eg:John'}
                  />
                 </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    label="Last Name"
                    variant="outlined"
                    type="text"
                    fullWidth
                    name="lname"
                    value={lname}
                    onChange={this.handleChange}
                    error={this.state.errors.lnameError 
                    }
                    helperText={this.state.errors.lnameError && validation.errorText("Please enter a valid last name") ||'eg: Dev'}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    label="Email"
                    variant="outlined"
                    fullWidth
                    type='email'
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                    error={this.state.errors.emailError 
                    }
                    helperText={this.state.errors.emailError && validation.errorText("Please enter a valid Email") ||'eg: John1@gmail.com'}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    label="contact"
                    variant="outlined"
                    fullWidth
                    type="tel"
                    name="contact"
                    value={contact}
                    onChange={this.handleChange}
                    error={this.state.errors.contactError 
                    }
                    helperText={this.state.errors.contactError && validation.errorText("Please enter a valid contact") ||'eg: 8888888888'}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    select
                    margin="normal"
                    required
                    fullWidth
                    label="Role"
                    name="role"
                    id="role"
                    value={role}
                    onChange={this.handleChange}
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="trainer">Trainer</MenuItem>
                    <MenuItem value="counsellor">Counsellor</MenuItem>
                  </TextField>


                </Grid>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend" required >Gender</FormLabel>
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
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    name="password"
                    type={this.state.showPassword ? 'text' : 'password'}
                    id="pass"
                    value={password}
                    onChange={this.handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              this.setState((prevState) => ({
                                showPassword: !prevState.showPassword,
                              }))
                            }
                            edge="end"
                          >
                            {this.state.showPassword ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={this.state.errors.passwordError
                    }
                    helperText={this.state.errors.passwordError && validation.errorText("Please enter a valid password") ||'eg: Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'}
                   />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                {this.state.isAddUser ? 'Add User' : 'Update User'}
              </Button>
              <Button
                type="button"
                onClick={this.handleClose}
                variant="contained"
                color="primary"
              >
                Cancel
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        {/* Delete pop up model  */}
        <Dialog
          open={this.state.confirmDialogOpen}
          onClose={this.closeConfirmDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this record?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeConfirmDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={this.confirmDelete} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* alert message after action perform */}
        <Snackbar
          open={this.state.snackbarOpen}
          autoHideDuration={3000}
          onClose={this.closeSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={this.closeSnackbar}
            severity="success"
            sx={{ width: '100%' }}
          >
            {this.state.snackbarMessage}
          </Alert>
        </Snackbar>

      </div >
    )
  }
}

export default Usertable;