import React, { Component } from 'react'
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
import { TextField, Button, Grid, Container, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import * as TablePaginationActions from "../common/TablePaginationActions"
import * as validation from '../../util/validation';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 500,
  border: '2px solid #000',
  bgcolor: 'background.paper',
  boxShadow: 24,
  overflow: 'auto',
  p: 4,
};

class ExamDashboard extends Component {
  constructor(props) {
    super(props)
    console.log("anmol", this.props)
    this.state = {
      exams: [],
      id: null,
      code: '',
      examname: '',
      examstatus: true,
      action: '',
      searchQuery: "",
      isAddExam: true,
      snackbarOpen: false,
      snackbarMessage: '',
      confirmDialogOpen: false,
      recordToDeleteId: null,
      errors: {
        codeError: false,
        examnameError: false,
        examstatusError: false,
      },
      status: true,
      open: false,
      page: 0,
      rowsPerPage: 5
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.allExams !== this.props.allExams){
      this.setState({exams:this.props.allExams})
      console.log("updated all exam data",this.props.allExams);
    }

    if (prevProps.singleExam !== this.props.singleExam) {
      const { id = 0, code = "", examname = "", examstatus = false } = this.props.singleExam;
      this.setState({
        id, code, examname, examstatus
      }, () => console.log(this.state))
    }
  }

  componentDidMount() {
    this.props.initExamRequest;
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
  
   // to toggle button  
    toggelChange = (index, newExamStatus) => {
    const { page, rowsPerPage, exams } = this.state;
    const dataIndex = page * rowsPerPage + index;
    exams[dataIndex].examstatus = newExamStatus;
    this.setState({ exams: exams }, () => {
      const updatedExams = exams[dataIndex];  
      this.props.updateExamRequest(updatedExams);
    });
  }

  // for add-update onchange method
  handleChange = (event, index) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    console.log(value)
    // vadlidation for exam code
    if (name === "code") {
      const codeError = !(validation.isValidName(this.state[name]));
      if (codeError) {
        this.setState({ errors: { ...this.state.errors, codeError: true } })
      } else {
        this.setState({ errors: { ...this.state.errors, codeError: false } })
      }
    }
    // vadlidation for examname
    if (name === "examname") {
      const examnameError = !(validation.isValidExamname(this.state[name]));
      if (examnameError) {
        this.setState({ errors: { ...this.state.errors, examnameError: true } })
      } else {
        this.setState({ errors: { ...this.state.errors, examnameError: false } })
      }
    }
  }
  
  //to popup add exam popup 
  handleOpen = (id = null) => {
    if (id !== null) {
      this.getsinglerecord(id);
      this.setState({ open: true, isAddExam: false });
    } else {
      this.setState({ open: true, isAddExam: true });
      this.resetExamFormHandler(
      );
    }
  };

  handleClose = () => {
    this.setState({ open: false });
  };

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

  // delete action
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
    this.props.getSingleExamRequest(id)
  }

  // update and add actions
  resetExamFormHandler = () => {
    this.setState({
      id: null,
      code: '',
      examname: '',
      examstatus: '',
    })
  }

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
        snackbarMessage: 'Add exam successfully',
      });
      // Refresh exam data after adding or updating
      this.props.initExamRequest();
    }
    else {
      eobj['id'] = this.state.id;
      // this.props.initExamRequest();
      this.props.updateExamRequest(eobj);
      this.setState({
        snackbarOpen: true,
        snackbarMessage: 'Edit exam successfully',
      });
    }
    this.handleClose();
    // Refresh exam data after adding or updating
    this.props.initExamRequest();
  }

  // close alert message 
  closeSnackbar = () => {
    this.setState({
      snackbarOpen: false,
      snackbarMessage: '',
    });
  };

  render() {
    const { exams, id, code, examname, examstatus, page, rowsPerPage, open, searchQuery } = this.state;
    const filteredExam = this.props.allExams && this.props.allExams.filter((data) => {

      const searchQuery = this.state.searchQuery;
      const examCodeInclude = data.code.toLowerCase().includes(searchQuery)
      const examNameIncludes = data.examname.toLowerCase().includes(searchQuery)

      return examCodeInclude || examNameIncludes
    });
    return (
      <div>
        {/* start table */}
        <Box sx={{ height: 100 }}>
          <Paper className='paper'>
            <TableContainer>
              <Table aria-label="simple table" className=''>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={7} sx={{ backgroundColor: '#1976d2', fontSize: "25px", fontWeight: "bolder", color: "white" }}>
                      <Grid className='resultheader' container alignItems="center" justifyContent="space-between" style={{ position: 'relative', overflow: "auto", top: 0, zIndex: 1, }}>
                        <Grid item>
                          Manage Exam
                        </Grid>
                        <Grid item>
                          <TextField
                            className='searchinput'
                            type="text"
                            value={searchQuery}
                            onChange={this.handleSearchChange}
                            placeholder="Search Exam"
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
                              )
                            }}
                          />
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>

                  {/* add exam button */}
                  <TableRow>
                    <Button variant="contained" color="primary" size="small" type="button" sx={{ margin: "8px", padding: "5px 5px", }} onClick={() => (this.handleOpen())}><AddIcon />Exam</Button>
                  </TableRow>
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

                  {filteredExam?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} align='center'>
                        <strong style={{ fontSize: "34px" }}>No data found</strong>
                      </TableCell>
                    </TableRow>
                  ) : (

                    filteredExam?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, index) => {
                      const currentindex = page * rowsPerPage + index;

                      return (
                        <TableRow key={data.id} className="tablebody">
                          <TableCell className="tablebody" component="th" align="center" scope="row">{currentindex + 1}</TableCell>
                          <TableCell className="tablebody" align="center">{data.code}</TableCell >
                          <TableCell className="tablebody" align="center">{data.examname}</TableCell >
                          <TableCell>
                          <Switch
                                checked={data.examstatus}
                                onChange={() => this.toggelChange(index, !data.examstatus)}
                                inputProps={{ 'aria-label': 'controlled' }}
                              />
                              {data.examstatus ? "Enabled" : "Disabled"}

                          </TableCell>
                          <TableCell className="tablebody" align='center'><Button
                            onClick={() => (this.handleOpen(data.id))} ><EditIcon />
                          </Button>
                            <Button
                              onClick={() => (this.deletedata(data.id))}
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
              <DialogTitle sx={{ backgroundColor: "#1976d2", color: "white", fontSize: "25px", textAlign: "start", fontWeight: "bolder" }}>{this.state.isAddExam ? 'Add Exam' : 'Update Exam'}</DialogTitle>
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
                        error={this.state.errors.codeError
                        }
                        helperText={this.state.errors.codeError && validation.errorText("Please enter a valid code ") || 'eg:HI-3'}
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
                        error={this.state.errors.examnameError
                        }
                        helperText={this.state.errors.examnameError && validation.errorText("Please enter a exam name") || 'eg:Java,php'}
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
                          <FormControlLabel value="true" checked={examstatus === "disable"} control={<Radio />} label="Disabled" />
                          <FormControlLabel value="false" checked={examstatus === "enable"} control={<Radio />} label="Enabled" />
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
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={7} // Adjust the colSpan value according to your table structure
              count={filteredExam.length}
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