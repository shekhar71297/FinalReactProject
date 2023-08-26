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
import Switch from '@mui/material/Switch';
import * as TablePaginationActions from '../common/TablePaginationActions';


export class Datatable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switchindex: null,
      status: true,
      vcodes: [],
      page: 0,
      rowsPerPage: 5,

    };
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.allvouchers !== this.props.allvouchers) {
      // Update vcodes when allvouchers prop changes
      this.setState({ vcodes: this.props.allvouchers });
    }
  }
  componentDidMount() {

    this.props.initVoucherRequest()
    
  }

  handleChange = (index, status, event) => {
    const { page, rowsPerPage } = this.state;
    let vcodes = this.state.vcodes;
    const dataIndex = page * rowsPerPage + index;
    // console.log("before",vcodes,index,vcodes[index]);
    vcodes[dataIndex].status = !status;
    // console.log("after",vcodes);
    this.setState({ vcodes: vcodes }, () => {
      console.log(this.state.vcodes[dataIndex])
      this.props.updateVoucherRequest(this.state.vcodes[dataIndex]);
    });

  };


  // pagination function
  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };
  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10), page: 0 });

  };

  render() {
    const { page, rowsPerPage, vcodes } = this.state;

    return (
      <div className='container' style={{ marginRight: '25px' }} >


        <hr />
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={8} sx={{ backgroundColor: "#1976d2", fontSize: "25px", textAlign: "start", fontWeight: "bolder", color: "white" }}>
                  Manage Voucher</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="left">Voucher Code</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                this.props.allvouchers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, index) => {
                  const currentIndex = page * rowsPerPage + index + 1;
                  return (
                    <TableRow key={data.id}>
                      <TableCell component="th" scope="row">{currentIndex}</TableCell>

                      <TableCell>{data.Vcode}</TableCell>
                      <TableCell>
                        <Switch
                          key={index}
                          checked={data.status}
                          onChange={(e) => this.handleChange(index, data.status)}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />


                      </TableCell>

                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table> 

          <TablePagination

            rowsPerPageOptions={[5, 10, 25]}
            colSpan={6} // Adjust the colSpan value according to your table structure
            count={this.props.allvouchers.length}
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
        </TableContainer>
      </div>
    );
  }
}

export default Datatable;