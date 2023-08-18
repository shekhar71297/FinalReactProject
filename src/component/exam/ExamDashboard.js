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
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

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
      snackbarOpen: false,
      snackbarMessage: '',
      confirmDialogOpen: false,
      recordToDeleteId: null,
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

  // for add-update onchange method
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
    this.props.initExamRequest();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.singleExam !== this.props.singleExam) {
      const { id, code, examname, examstatus } = this.props.singleExam;
      this.setState({
        id, code, examname, examstatus
      }, () => console.log(this.state))
    }
  }

  // Function to open the delete popup model
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

  getsinglerecord = (id) => {
    this.props.getSingleExamRequest(id)
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

  // close alert message 
  closeSnackbar = () => {
    this.setState({
      snackbarOpen: false,
      snackbarMessage: '',
    });
  };

  //update exam 
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
      this.props.addExamRequest(eobj);
      this.setState({
        snackbarOpen: true,
        snackbarMessage: 'User added successfully',
      });
    }
    else {
      eobj['id'] = this.state.id;
      this.props.initExamRequest();
      this.props.updateExamRequest(eobj);
      this.setState({
        snackbarOpen: true,
        snackbarMessage: 'User updated successfully',
      });
    }
    this.handleClose();
  }

  deletedata = (id) => {
    this.openConfirmDialog(id);
  };

  confirmDelete = () => {
    const id = this.state.recordToDeleteId;
    this.props.initExamRequest();
    this.props.deleteExamRequest(id);
    this.closeConfirmDialog();
    this.setState({
      snackbarOpen: true,
      snackbarMessage: 'Exam deleted successfully',
    });
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

  render() {
    const { exams, id, code, examname, examstatus, page, rowsPerPage, open, searchQuery, isDetailsPopupOpen, isDeletePopupOpen } = this.state;
    const filteredExam = this.props.allExam.filter((data) => {

      const searchQuery = this.state.searchQuery;
      const examCodeInclude = data.code.toLowerCase().includes(searchQuery)
      const examNameIncludes = data.examname.toLowerCase().includes(searchQuery)
     
      return examCodeInclude || examNameIncludes 
    });

    return (
      <div>
        
        {/* start table */}
        <Box sx={{ height: 50 }}>

        {/*add exam form  */}
        <Button className='addbtn' variant="contained" color="primary" onClick={() => (this.handleOpen())}><AddIcon />Exam</Button>

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
          <br />
          <Paper className='paper'>
            <TableContainer>
              <Table aria-label="simple table" className=''>
                <TableHead>

          <TableRow>
            <TableCell align="center" colSpan={8} sx={{ backgroundColor:"#1976d2",color:"white" , fontSize:"25px" , textAlign:"start" , fontWeight:"bolder"}}>
              Exam module
            </TableCell>
          
          </TableRow>
                  <TableRow>
                    <TableCell align="center"><strong>Exam Id</strong></TableCell>
                    <TableCell align="center"><strong>Exam Code</strong></TableCell>
                    <TableCell align="center"><strong>Exam Name</strong></TableCell>
                    <TableCell align="center"><strong>Exam Staus</strong></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"><strong>Action</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableBody>
                  </TableBody>
                  
                  {filteredExam.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} align='center'>
                        <strong style={{ fontSize: "34px" }}>No data found</strong>
                      </TableCell>
                    </TableRow>
                  ) : (
                  
                   filteredExam.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, index) => {
                                      const currentindex= page*rowsPerPage + index ;

                      return (
                        <TableRow key={data.id} className="tablebody">
                          <TableCell className="tablebody" component="th" align="center" scope="row">{currentindex + 1}</TableCell>
                          <TableCell className="tablebody" align="center">{data.code}</TableCell >
                          <TableCell className="tablebody" align="center">{data.examname}</TableCell >
                          <TableCell className="tablebody" align="center">{data.examstatus}</TableCell>
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
                            onClick={() => (this.handleOpen(data.id))} ><EditIcon />
                          </Button>
                            <Button
                              onClick={() => this.deletedata(data.id)}
                              ><DeleteIcon />
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })
                    )}

                </TableBody>
              </Table>
            </TableContainer>

            {/* add-update user */}
            <Dialog open={open} onClose={this.handleClose} >
              <DialogTitle sx={{ backgroundColor:"#1976d2",color:"white" , fontSize:"25px" , textAlign:"start" , fontWeight:"bolder"}}>{this.state.isAddExam ? 'Add Exam' : 'Update Exam'}</DialogTitle>
              <form onSubmit={this.updateExam}>
                <DialogContent>

                  <Grid container spacing={2}>
                  <Grid item xs={12} >
                      <TextField
                        required
                        label="Exam Code"
                        variant="outlined"
                        fullWidth
                        name="code"
                        value={code}
                        onChange={this.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} >
                      <TextField
                        required
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
                          <FormControlLabel value="disable" checked={examstatus === "false"} control={<Radio />} label="Disabled" />
                          <FormControlLabel value="enable" checked={examstatus === "true"} control={<Radio />} label="Enabled" />
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

            {/* table pagination */}
            <TablePagination
              component="div"
              rowsPerPageOptions={[5, 10, 25]}
              count={filteredExam.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={this.handleChangePage}
              onRowsPerPageChange={this.handleChangeRowsPerPage}
            />
            
          </Paper>
        </Box>
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
      </div>
    )
  }
}
export default ExamDashboard;
