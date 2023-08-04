import React, { Component } from 'react';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination'; // Import TablePagination
import './StudentResult.css'
import * as resultaction from '../../pages/result/Action';
import { connect } from 'react-redux';


export class StudentResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      StudentResultData: [],
      page: 0,
      rowsPerPage: 5, 
      searchQuery: '' 
    };
  }
  componentDidMount() {
    this.props.initresultRequest();
  }
    // delete action 
  deletedata = (id) => {
    if (window.confirm('Are you sure to delete Record data')) {
      this.props.deleteResultRequest(id);
      window.alert('Record deleted successfully');
    }
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
    const percentage = (obtainedMark / totalMark) * 50;

    if (percentage >= 45) {
      return 'A+';
    } else if (percentage >=40 ) {
      return 'A';
    } else if (percentage >= 30) {
      return 'B';
    } else if (percentage >= 20) {
      return 'c';
    } else {
      return 'Fail';
    }
  };

  render() {
    const { searchQuery, page, rowsPerPage } = this.state;

    const filteredResults = this.props.allresult.filter((val) =>
    val.StudentName.toLowerCase().includes(searchQuery.toLowerCase())
  );
    return (
      <div>
        {/* search box */}
          <input className='searchinput'
          type="text"
          value={searchQuery}
          onChange={this.handleSearchChange}
          placeholder="Search by Student Name"
        />
        {/* start taable */}
        <TableContainer style={{ border: '2px solid black' }}>
          <Table aria-label="simple table" className=''>
            <TableHead>
                              <TableCell className='tablehead'>SrNo</TableCell>
                                <TableCell className='tablehead' align="center">StudentName</TableCell>
                                <TableCell className="tablehead" align="center">Orgnization</TableCell>
                                <TableCell className="tablehead" align="center">Branch</TableCell>
                                <TableCell className="tablehead" align="center">ExamName</TableCell>
                                <TableCell className="tablehead" align="center">TotalMark</TableCell>
                                <TableCell className="tablehead" align="center">ObtainedMark</TableCell>
                                <TableCell  className="tablehead"align="center">Status</TableCell>
                                <TableCell className="tablehead" align="center">Grade</TableCell>
                                <TableCell className="tablehead" align="center">Date</TableCell>
                                <TableCell className="tablehead" align="center">Action</TableCell>
            </TableHead>
            <TableBody>
              {filteredResults
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((val)=>{
                  const grade = this.calculateGrade(val.TotalMark, val.ObtainedMark);

                  return (
                    <TableRow key={val.id} className="tablebody">
                                   <TableCell className="tablebody" component="th" scope="row">{val.id}</TableCell>
                                    <TableCell className="tablebody" align="center">{val.StudentName}</TableCell >
                                    <TableCell className="tablebody" align="center">{val.Orgnization}</TableCell >
                                    <TableCell className="tablebody" align="center">{val.Branch}</TableCell>
                                    <TableCell className="tablebody" align="center">{val.ExamName}</TableCell>
                                    <TableCell className="tablebody" align="center">{val.TotalMark}</TableCell>
                                    <TableCell className="tablebody" align="center">{val.ObtainedMark}</TableCell>
                                    <TableCell  className="tablebody"align="center">{val.Status}</TableCell>
                                    {/* <TableCell className="tablebody" align="center">{val.Grade}</TableCell> */}
                                    <TableCell className="tablebody" align="center">{grade}</TableCell>

                                   
                                    <TableCell className="tablebody" align="center">{val.Date}</TableCell>
                                    <TableCell className="tablebody" align="cnter"><button
                                        onClick={() => this.deletedata(val.id)} align="cnter"
                                    ><i className="fa fa-trash-o" aria-hidden="true"></i></button></TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        {/* table pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25,35,50]}
          component="div"
          count={filteredResults.length} // Use the filtered results length for pagination
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={this.handleChangePage}
          onRowsPerPageChange={this.handleChangeRowsPerPage}
        />
      </div>
    );
  }
}
// redux code
const mapStateToProps = (state) => ({
  allresult: state.resultStore.allresult,
});

const mapDispatchToprops = (dispatch) => ({
  initresultRequest: () => dispatch(resultaction.getAllResult()),
  deleteResultRequest: (id) => dispatch(resultaction.deleteAllResult(id)),
});

export default connect(mapStateToProps, mapDispatchToprops)(StudentResult);
