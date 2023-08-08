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
import * as useraction from '../../pages/user/action'
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
      isAddUser: true
    }
  }


  componentDidUpdate(prevProps) {

    if (prevProps.singleUser !== this.props.singleUser) {
      const { id, fname, lname, role, password, contact, gender, email } = this.props.singleUser;
      this.setState({
        id, fname, lname, role, password, contact, gender, email
      }, () => console.log(this.state))
    }
  }
  componentDidMount() {
    // this.fetchData();

    this.props.initUserRequest();
    console.log(this.props.singleUser)

  }
  handleSearchQueryChange = (event) => {
    this.setState({ searchQuery: event.target.value, page:0 });
  };

  // fetchData = () => {
  //   const url = `${constants.baseURL}/user`;
  //   getData(url).then((res) => {
  //     console.log(res.data);
  //     this.setState({ user: res.data });
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
  deletedata = (id) => {
    
    if (window.confirm(`Are you sure to delete Recore data :${id}`)) {
      this.props.initUserRequest()
      this.props.deleteUserRequest(id)
      // let url = `${"http://localhost:8888/user"}/${id}`
      // const url = `${constants.baseURL}/user/${id}`;
      // DeleteData(url).then(() => {
      //   window.alert("Record delete succesfully");
      //   this.fetchData()
      // })

    }
  }
  getsinglerecord = (id) => {
    this.props.getSingleUserRequest(id)

    // let url =`${get_user}/${id}`;
    // const url = `${constants.baseURL}/user/${id}`;
    // getData(url).then((res) => {
    //   console.log(res.data);
    //   const { user, id, fname, lname, password, email, role, gender, contact } = res.data;
    //   this.setState({ id, fname, lname, password, email, role, gender, contact });
    // })
  }

  resetUserFormHandler = () => {
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

  updateuser = (event) => {
    event.preventDefault();
    let pobj = {
      email: this.state.email,
      fname: this.state.fname,
      lname: this.state.lname,
      password: this.state.password,
      role: this.state.role,
      gender: this.state.gender,
      contact: this.state.contact,
    }
    if (this.state.isAddUser) {
      this.props.addUserRequest(pobj);
      // const url = `${constants.baseURL}/user`;
      console.log("add ", pobj);
      // AddData(url, pobj).then(() => {
      window.alert("User added successfully")
      // })
    } else {
      pobj['id'] = this.state.id;
      this.props.initUserRequest()
      this.props.updateUserRequest(pobj)
      // const url = `${constants.baseURL}/user/${this.state.id}`;
      console.log("update ", pobj);
      // UpdateData(url, pobj).then(() => {
      window.alert("Record updated successfully");
      //   this.fetchData();
      // })
    }




  }
  render() {
    // const { open, } = this.state;
    const { page, rowsPerPage, user, fname, open, lname, password, contact, email, gender, role } = this.state;
    // const filteredUsers = this.props.allUser.filter((data) =>{
    //   const searchQuery = this.state.searchQuery;
    //   const fnameIncludes = data.fname.toUpperCase().includes(searchQuery)
    //   const lnameIncludes = data.lname.toUpperCase().includes(searchQuery)
    //   const emailIncludes = data.email.toUpperCase().includes(searchQuery)
    //   const roleIncludes =data.role.toUpperCase().includes(searchQuery)

    //     return fnameIncludes || lnameIncludes || emailIncludes || roleIncludes 
        
    //     }    
    //     );
    return (

      <div className='container'>
        <Box sx={{ height: 100 }}>
          <Paper sx={{ width: "100%", overflow: "hidden", position: "relative", right: "30px", top: "50px" }}>
            <Button variant="contained" color="primary" size="small" type="button" onClick={() => (this.handleOpen())}><AddIcon/>User</Button>&nbsp;
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
                    <TableCell align="center">Password</TableCell>
                    <TableCell align="center">Role</TableCell>
                    <TableCell align="center">Gender</TableCell>
                    <TableCell align="center">Contact</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.allUser.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, index) => {


                    return <TableRow key={index}>
                      <TableCell component="th" scope="row">{data.id}</TableCell>
                      <TableCell>{data.fname}</TableCell >
                      <TableCell>{data.lname}</TableCell >
                      <TableCell>{data.email}</TableCell>
                      <TableCell>{data.password}</TableCell>
                      <TableCell>{data.role}</TableCell>
                      <TableCell>{data.gender}</TableCell>
                      <TableCell>{data.contact}</TableCell>

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
                count={this.props.allUser.length}
              
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
            <form onSubmit={this.updateuser}>
              <Grid container spacing={2}>
                <Grid item xs={12} >
                  <TextField
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    name="fname"
                    value={fname}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    name="lname"
                    value={lname}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="contact"
                    variant="outlined"
                    fullWidth
                    name="contact"
                    value={contact}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Role"
                    variant="outlined"
                    fullWidth
                    name="role"
                    value={role}
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
                    {this.state.isAddUser ? "Add User" : "Update User"}
                  </Button>
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
  allUser: state.userStore.allUser,
  singleUser: state.userStore.user
});

const mapDispatchToProps = (dispatch) => ({
  initUserRequest: () => dispatch(useraction.getAlluser()),
  updateUserRequest: (id) => dispatch(useraction.updateUser(id)),
  addUserRequest: (data) => dispatch(useraction.addUser(data)),
  deleteUserRequest: (id) => dispatch(useraction.deleteUser(id)),
  getSingleUserRequest: (id) => dispatch(useraction.getSingleuser(id))

})

export default connect(mapStateToProps, mapDispatchToProps)(Usertable);