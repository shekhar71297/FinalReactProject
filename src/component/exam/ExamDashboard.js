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
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import { TextField, Button, Grid, Container, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import Typography from '@mui/material/Typography';
import './ExamDashboard.css'
import * as constants from "../../util/Constant";
import { Get, Post, Put, Delete } from "../../util/HttpService"
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

class ExamDashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      exams: [],
      id: null,
      code: '',
      examname: '',
      examstatus: '',
      action: '',
      searchQuery: "",
      isAddExam: true,
      // switchindex:null,
      status: true,
      open: false,
      page: 0,
      rowsPerPage: 5
    }
  }

  //for pagination
  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };
  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10), page: 0 });
  };

  // search function
  handleSearchChange = (event) => {
    this.setState({ searchQuery: event.target.value, page: 0 });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    console.log(value);
  }

  handleOpen = (id = null) => {
    this.resetUserFormHandler();

    if (id !== null) {
      this.getsinglerecord(id);
      this.setState({ open: true, isAddExam: false });
    } else {
      this.setState({ open: true, isAddExam: true });
    }
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const url = `${constants.baseURL}/exams`;
    Get(url).then((res) => {
      console.log(res.data);
      this.setState({ exams: res.data });
      // const filteredExams = res.data.filter(exam =>
      //   exam.examname.toLowerCase().includes(this.state.searchQuery.toLowerCase())
      // );
      // this.setState({ exams: filteredExams });
      // const url = `${constants.baseURL}/user`;
      //   getData(url).then((res) => {
      //     console.log(res.data);
      //     this.setState({ user: res.data });
      //   })
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.singleExam !== this.props.singleExam) {
      const { id, code, examname, examstatus } = this.props.singleExam;
      this.setState({
        id, code, examname, examstatus
      }, () => console.log(this.state))
    }
  }

  // Function to open the delete popup model
  openDeletePopup = (id) => {
    this.setState({ isDeletePopupOpen: true, deletingRecordId: id });
  };

  // Function to close the delete popup model
  closeDeletePopup = () => {
    this.setState({ isDeletePopupOpen: false, deletingRecordId: null });
  };

  getsinglerecord = (id) => {
    // this.props.getSingleUserRequest(id)
    let url = `${"http://localhost:8888/exams"}/${id}`;
    // const url = `${constants.baseURL}/user/${id}`;
    axios.get(url).then((res) => {
      console.log(res.data);
      const { exams, id, code, examname, examstatus } = res.data;
      this.setState({ id, code, examname, examstatus });
    })
  }

  resetUserFormHandler = () => {
    this.setState({
      //exam: [],
      id: null,
      code: '',
      examname: '',
      examstatus: '',
      action: ''
    })
  }

  updateExam = (event) => {
    event.preventDefault();
    let eobj = {
      id: this.state.id,
      code: this.state.code,
      examname: this.state.examname,
      examstatus: this.state.examstatus,
      action: this.state.action
    }
    if (this.state.isAddExam) {
      // this.props.addExamRequest(eobj);
      const url = `${constants.baseURL}/exams`;

      console.log("add ", eobj);

      Post(url, eobj).then(() => {
        window.alert("User added successfully")
      })
    } else {
      eobj['id'] = this.state.id;
      // this.props.initExamRequest()
      // this.props.updateExamRequest(eobj)
      const url = `${constants.baseURL}/exams/${this.state.id}`;
      console.log("update ", eobj);
      Put(url, eobj).then(() => {
        window.alert("Record updated successfully");
        this.fetchData();
      })
    }
  }

  // for delete operation
  deleteExam = (id) => {
    if (window.confirm(`Are you sure to delete record with id:${id}`)) {
      let url = `${"http://localhost:8888/exams"}/${id}`
      Delete(url).then(() => { ////then use for as promises. 
        window.alert("Record Deleted successfully");
        // this.fetchdata(); ///refresh krte
      });
    }
  }

  render() {
    const { exams, id, code, examname, examstatus, page, rowsPerPage, open, searchQuery, isDetailsPopupOpen, isDeletePopupOpen } = this.state;
    // const filteredexam = exams.filter((val) => {
    //   const searchQuery = this.state.searchQuery;
    //   const examNameIncludes = val.examname.toLowerCase().includes(searchQuery);
    //   const examStatusIncludes = val.examstatus.toLowerCase().includes(searchQuery.toLowerCase());
    //   // Add similar code for dateIncludes if needed
    //   return examNameIncludes || examStatusIncludes;
    // });

    return (
      <div>
        <br /><br />
        {/* add button */}
        <div className='firstcontainer'>
          <Button className='addbtn' variant="contained" color="primary" onClick={() => (this.handleOpen())}><AddIcon />Exam</Button>
          <div>
            {/* search box */}
            <TextField
              className='searchinput'
              type="text"
              align="right"
              value={searchQuery}
              onChange={this.handleSearchChange}
              placeholder="Search Result"
              label="Search Result"
              variant="outlined"
              sx={{
                paddingBottom: 4,
              }}
            />
          </div>
        </div>

        {/* start table */}
        <Box sx={{ height: 100 }}>
          <Paper className='paper'>
            <TableContainer>
              <Table aria-label="simple table" className=''>
                <TableHead>
                  <TableRow>
                    <TableCell align="center"><strong>Exam Id</strong></TableCell>
                    <TableCell align="center"><strong>Exam Code</strong></TableCell>
                    <TableCell align="center"><strong>Exam Name</strong></TableCell>
                    <TableCell align="center"><strong>Exam Staus</strong></TableCell>
                    <TableCell align="center"><strong>Action</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableBody>
                  </TableBody>

                  {
                    exams.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, index) => {
                                      const currentindex= page*rowsPerPage + index ;

                      return (
                        <TableRow key={data.id} className="tablebody">
                          <TableCell className="tablebody" component="th" align="center" scope="row">{currentindex + 1}</TableCell>
                          <TableCell className="tablebody" align="center">{data.code}</TableCell >
                          <TableCell className="tablebody" align="center">{data.examname}</TableCell >
                          {/* <TableCell className="tablebody" align="right">{data.examstatus}</TableCell> */}
                          <TableCell>
                            <Switch align="left"
                              key={index}
                              // checked={this.state.examstatus}
                              // checked={data.examstatus}
                              // onChange={(e)=>this.handleChange(index,data.examstatus)}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                          </TableCell>
                          <TableCell className="tablebody" align='center'><Button
                            onClick={() => (this.handleOpen(data.id))} align="center"><EditIcon />
                          </Button>

                            <Button
                              onClick={() => this.deleteExam(data.id)} align="center"><DeleteIcon />
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    }
                    )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* add-update user */}
            <Dialog open={open} onClose={this.handleClose}>
              <DialogTitle>{this.state.isAddExam ? 'Add Exam' : 'Update Exam'}</DialogTitle>
              <form onSubmit={this.updateExam}>
                <DialogContent>


                  <Grid container spacing={2}>
                    <Grid item xs={12} >
                      <TextField
                        label="Exam Name"
                        variant="outlined"
                        fullWidth
                        name="examname"
                        value={examname}
                        onChange={this.handleChange}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Exam Staus</FormLabel>
                        <RadioGroup
                          aria-label="examstaus"
                          name="examstatus"
                          value={examstatus}
                          onChange={this.handleChange}
                          row
                        >
                          <FormControlLabel value="false" checked={examstatus === "false"} control={<Radio />} label="Disabled" />
                          <FormControlLabel value="true" checked={examstatus === "true"} control={<Radio />} label="Enabled" />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </Grid>
                </DialogContent>

                <DialogActions>
                  <Button type="submit" variant="contained" color="primary">
                    {this.state.isAddExam ? 'Add Exam' : 'Update Exam'}
                  </Button>
                  <Button onClick={this.handleClose} variant="contained" color="primary">
                    Cancel
                  </Button>
                </DialogActions>
              </form>
            </Dialog>

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

            {/* table pagination */}
            <TablePagination
              component="div"
              rowsPerPageOptions={[5, 10, 25]}
              count={exams.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={this.handleChangePage}
              onRowsPerPageChange={this.handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      </div>
    )
  }
}
export default ExamDashboard;
