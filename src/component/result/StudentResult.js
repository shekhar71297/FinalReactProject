import React, { Component } from 'react';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination'; // Import TablePagination
import './StudentResult.css'
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Paper } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import TextField from '@mui/material/TextField';

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
      selectedRecord: ""
    };
  }
  componentDidMount() {
    this.props.initresultRequest();
  }

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

  // Delete action
  deletedata = (id) => {
    this.openDeletePopup(id);
  };

  // Function to handle the actual delete action after user confirmation
  handleDeleteConfirmed = () => {
    const { deletingRecordId } = this.state;
    this.props.deleteResultRequest(deletingRecordId);
    this.closeDeletePopup();
    // window.alert('Record deleted successfully');
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

    if (percentage >= 40) {
      return 'A';

    } else if (percentage >= 30) {
      return 'B';
    } else if (percentage >= 20) {
      return 'c';
    } else {
      return '-';
    }
  };
  calculateStatus = (tmark, omark) => {
    const result = (omark / tmark) * 50;
    if (result >= 20) {
      return "pass"
    }
    else {
      return "fail"
    }
  }

  render() {
    const { searchQuery, page, rowsPerPage, isDeletePopupOpen, selectedRecord, isDetailsPopupOpen } = this.state;
    const grade = this.calculateGrade(selectedRecord.TotalMark, selectedRecord.ObtainedMark);
    // const status = this.calculateStatus(selectedRecord.TotalMark , selectedRecord.ObtainedMark);
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
      <div>
        {/* search box */}
        <TextField
          className='searchinput'
          type="text"
          value={searchQuery}
          onChange={this.handleSearchChange}
          placeholder="Search Result"
          label="Search Result" // Optional label for the input field
          variant="outlined" // You can choose the variant based on your design
          sx={{
          paddingBottom:4 ,
          }}
        />
        {/* table pop up */}

        {/* Details Popup Model */}
        <Dialog open={isDetailsPopupOpen} onClose={this.closeDetailsPopup}>
          <DialogTitle>Result Details</DialogTitle>
          {selectedRecord && (
            <DialogContent>
              <DialogContentText className='popup'>
                {/* Show the details of the selected record here */}

                <strong>Student Name::</strong> {selectedRecord.StudentName} <br />
                <strong>Organization:: </strong>{selectedRecord.Orgnization} <br />
                <strong>Branch::</strong> {selectedRecord.Branch} <br />
                <strong>Exam Name:: </strong>{selectedRecord.ExamName} <br />
                <strong>TotalMark::</strong> {selectedRecord.TotalMark} <br />
                <strong> ObtainedMark:: </strong>{selectedRecord.ObtainedMark} <br />
                <strong> Status :: </strong>{selectedRecord.status} <br />
                <strong> Grade:: </strong>{grade} <br />
                <strong> Date::</strong> {selectedRecord.Date} <br />

              </DialogContentText>
            </DialogContent>
          )}
          <DialogActions>
            <Button onClick={this.closeDetailsPopup} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* start table */}
        <Box sx={{height: 100}}>
          <Paper className='paper'>
            <TableContainer>
              <Table aria-label="simple table" className=''>
                <TableHead>
                  <TableRow>
                  <TableCell ><strong>SrNo</strong></TableCell>
                  <TableCell align="center"><strong>StudentName</strong></TableCell>
                  <TableCell align="center"><strong>Orgnization</strong></TableCell>
                  {/* <TableCell  align="center">Branch</TableCell> */}
                  <TableCell align="center"><strong>ExamName</strong></TableCell>
                  {/* <TableCell  align="center">TotalMark</TableCell> */}
                  {/* <TableCell  align="center">ObtainedMark</TableCell> */}
                  <TableCell align="center"><strong>Status</strong></TableCell>
                  {/* <TableCell  align="center">Grade</TableCell> */}
                  <TableCell align="center"><strong>Date</strong></TableCell>
                  <TableCell align="center"><strong>Action</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredResults.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} align="center">
                        <strong style={{ fontSize: "34px" }}>  No data found</strong>
                      </TableCell>
                    </TableRow>
                  ) : (

                    filteredResults.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((val, index) => {
                        // const grade = this.calculateGrade(val.TotalMark, val.ObtainedMark);
                        const status = this.calculateStatus(val.TotalMark, val.ObtainedMark)
                        return (
                          <TableRow key={val.id} className="tablebody">
                            <TableCell className="tablebody" component="th" scope="row">{index + 1}</TableCell>
                            <TableCell className="tablebody" align="center">{val.StudentName}</TableCell >
                            <TableCell className="tablebody" align="center">{val.Orgnization}</TableCell >
                            {/* <TableCell className="tablebody" align="center">{val.Branch}</TableCell> */}
                            <TableCell className="tablebody" align="center">{val.ExamName}</TableCell>
                            {/* <TableCell className="tablebody" align="center">{val.TotalMark}</TableCell> */}
                            {/* <TableCell className="tablebody" align="center">{val.ObtainedMark}</TableCell> */}
                            <TableCell className="tablebody" align="center">{status}</TableCell>
                            {/* <TableCell className="tablebody" align="center">{grade}</TableCell> */}
                            <TableCell className="tablebody" align="center">{val.Date}</TableCell>
                            <TableCell className="tablebody" align='center'><Button
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

            {/* table pagination */}
            <TablePagination
              disabled={filteredResults.length === 0}
              rowsPerPageOptions={[5, 10, 25, 35, 50]}
              component="div"
              count={filteredResults.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={this.handleChangePage}
              onRowsPerPageChange={this.handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      </div>
    );
  }
}


export default StudentResult
