import React, { Component } from 'react';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import './StudentResult.css'
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Grid, Paper } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import * as TablePaginationActions from "../common/TablePaginationActions";
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

export class StudentResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      StudentResultData: [],
      page: 0,
      rowsPerPage: 5,
      searchQuery: '',
      isDeletePopupOpen: false,
      deletingRecordId: null,
      isDetailsPopupOpen: false,
      selectedRecord: "",
      snackbarOpen: false,
      snackbarMessage: ''
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.allresult !== this.props.allresult) {
      this.setState({ StudentResultData: this.props.allresult });
    }
  }
  componentDidMount() {
    this.props.initresultRequest();
  }
  // pop up table
  // Function to open the table
  openDetailsPopup = (record) => {
    this.setState({ isDetailsPopupOpen: true, selectedRecord: record });
  };
  // Function to close the table
  closeDetailsPopup = () => {
    this.setState({ isDetailsPopupOpen: false, selectedRecord: "" });
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

  deletedata = (id) => {
    this.openDeletePopup(id);
  };
  handleDeleteConfirmed = () => {
    const { deletingRecordId } = this.state;
    this.props.deleteResultRequest(deletingRecordId);
    this.closeDeletePopup();
    this.setState({
      snackbarOpen: true,
      snackbarMessage: 'Result deleted successfully',
    });
  };
  // pagination function
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

  calculateGrade = (totalMark, obtainedMark) => {
    const percentage = (obtainedMark / totalMark) * 100;

    if (percentage >= 75) {
      return 'A';

    } else if (percentage >= 60) {
      return 'B';
    } else if (percentage >= 25) {
      return 'c';
    } else {
      return '-';
    }
  };
  calculateStatus = (tmark, omark) => {
    const result = (omark / tmark) * 100;
    if (result >= 50) {
      return "pass"
    }
    else {
      return "fail"
    }
  }
  render() {
    const { searchQuery, page, rowsPerPage, isDeletePopupOpen, selectedRecord, isDetailsPopupOpen } = this.state;
    const grade = this.calculateGrade(selectedRecord.TotalMark, selectedRecord.ObtainedMark);
    const status = this.calculateStatus(selectedRecord.TotalMark, selectedRecord.ObtainedMark)
    const filteredResults = this.props.allresult.filter((val) => {
      const searchQuery = this.state.searchQuery;
      const studentNameIncludes = val.StudentName.toLowerCase().includes(searchQuery);
      const organizationIncludes = val.Orgnization.toLowerCase().includes(searchQuery);
      const examNameIncludes = val.ExamName.toLowerCase().includes(searchQuery);
      const statusIncludes = val.status.toLowerCase().includes(searchQuery);
      const branchIncludes = val.Branch.toLowerCase().includes(searchQuery);
      const dateIncludes = val.Date.toLowerCase().includes(searchQuery);
      return studentNameIncludes || organizationIncludes || examNameIncludes || branchIncludes ||
        dateIncludes || statusIncludes
    }
    );
    return (
      <div > 

        {/* table pop up */}
        <Dialog open={isDetailsPopupOpen} onClose={this.closeDetailsPopup} fullWidth maxWidth="md" PaperProps={{
          sx: {
            width: '30%', 
          },
        }}>
          <DialogTitle sx={{ backgroundColor: '#1976d2', color: 'white', fontSize: '28px' }}>Result Details</DialogTitle>
          {selectedRecord && (
            <DialogContent sx={{ fontSize: '23px' , marginTop:"7px" }} >
              {/* Show the details of the selected record here */}
              <Typography  >
                <Typography component="span" variant="subtitle1" sx={{ fontSize: '23px' , }} >
                  <span style={{ fontWeight: "bold" }}> Student Name:</span>
                  {selectedRecord.StudentName} <br />
                </Typography>{" "}

                <Typography component="span" variant="subtitle1" sx={{ fontSize: '23px' }}>

                  <span style={{ fontWeight: "bold" }}> Organization :</span>
                  {selectedRecord.Orgnization} <br />
                </Typography>{" "}

                <Typography component="span" variant="subtitle1" sx={{ fontSize: '23px' }}>

                  <span style={{ fontWeight: "bold" }}> Branch:</span>
                  {selectedRecord.Branch} <br />
                </Typography>{" "}

                <Typography component="span" variant="subtitle1" sx={{ fontSize: '23px' }}>

                  <span style={{ fontWeight: "bold" }}>   Exam Name:</span>
                  {selectedRecord.ExamName} <br />
                </Typography>{" "}

                <Typography component="span" variant="subtitle1" sx={{ fontSize: '23px' }}>

                  <span style={{ fontWeight: "bold" }}>   Total mark:</span>
                  {selectedRecord.TotalMark} <br />
                </Typography>{" "}

                <Typography component="span" variant="subtitle1" sx={{ fontSize: '23px' }}>

                  <span style={{ fontWeight: "bold" }}>  ObtaineMark:</span>
                  {selectedRecord.ObtainedMark} <br />
                </Typography>{" "}

                <Typography component="span" variant="subtitle1" sx={{ fontSize: '23px' }}>

                  <span style={{ fontWeight: "bold" }}>  Status:</span>
                  {status} <br />
                </Typography>{" "}

              </Typography>
              <Typography component="span" variant="subtitle1" sx={{ fontSize: '23px' }}>

                <span style={{ fontWeight: "bold" }}>   Grade:</span>
                {grade} <br />
              </Typography>{" "}

              <Typography component="span" variant="subtitle1" sx={{ fontSize: '23px' }}>

                <span style={{ fontWeight: "bold" }}>  Date:</span>
                {selectedRecord.Date} <br />
              </Typography>{" "}

            </DialogContent>
          )}
          <DialogActions>
            <Button onClick={this.closeDetailsPopup} color="primary" sx={{ fontSize: "23px" }}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
        {/* start table */}
        <Box sx={{ marginRight: "25px", marginTop: 5, position: "relative", right: 20 }}>
          <Paper>
            <TableContainer >
              <Table aria-label="simple table" sx={{}} >
                <TableHead style={{ overflow: 'auto' }}>
                  <TableRow>
                    <TableCell align="center" colSpan={10} sx={{ backgroundColor: '#1976d2', fontSize: "25px", fontWeight: "bolder", color: "white" }}>
                      <Grid className='resultheader' container alignItems="center" justifyContent="space-between" style={{ position: 'relative', overflow: "auto", top: 0, zIndex: 1, }}>
                        <Grid item>
                        Manage Result 
                        </Grid>
                        <Grid item>

                          <TextField
                            className='searchinput'
                            type="text"
                            value={searchQuery}
                            onChange={this.handleSearchChange}
                            placeholder="Search Result"
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
                  <TableRow>
                    <TableCell align="center" ><Typography component="span" variant="subtitle1" sx={{ fontWeight: "bold" }}>SrNo</Typography></TableCell>
                    <TableCell align="center"><Typography component="span" variant="subtitle1" sx={{ fontWeight: "bold" }}>StudentName</Typography></TableCell>
                    <TableCell align="center"><Typography component="span" variant="subtitle1" sx={{ fontWeight: "bold" }}>Organization</Typography></TableCell>
                    <TableCell align="center"><Typography component="span" variant="subtitle1" sx={{ fontWeight: "bold" }}>ExamName</Typography></TableCell>
                    <TableCell align="center"><Typography component="span" variant="subtitle1" sx={{ fontWeight: "bold" }}>Status</Typography></TableCell>
                    <TableCell align="center"><Typography component="span" variant="subtitle1" sx={{ fontWeight: "bold" }}>Date</Typography></TableCell>
                    <TableCell align="center"><Typography component="span" variant="subtitle1" sx={{ fontWeight: "bold" }}>Action</Typography></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredResults.length === 0 ? (
                    <TableRow>
                      <TableCell align="center">
                        <strong style={{ fontSize: "34px" }}>  No data found</strong>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredResults.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((val, index) => {
                      const status = this.calculateStatus(val.TotalMark, val.ObtainedMark)
                      const currentIndex = page * rowsPerPage + index + 1;
                      return (
                        <TableRow key={val.id} >
                          <TableCell align="center" component="th" scope="row">{currentIndex}</TableCell>
                          <TableCell align="center">{val.StudentName}</TableCell >
                          <TableCell align="center">{val.Orgnization}</TableCell >
                          <TableCell align="center">{val.ExamName}</TableCell>
                          <TableCell align="center">{status}</TableCell>
                          <TableCell align="center">{val.Date}</TableCell>
                          <TableCell align='center'><Button
                            onClick={() => this.deletedata(val.id)} align="cnter"><DeleteIcon />
                          </Button>
                            <Button
                              onClick={() => this.openDetailsPopup(val)} align="cnter"><VisibilityIcon />
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })
                  )}
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
            {/* table pagination */}

            <TablePagination

              rowsPerPageOptions={[5, 10, 25]}
              colSpan={7} // Adjust the colSpan value according to your table structure
              count={filteredResults.length}
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
      </div>
    );
  }
}
export default StudentResult
