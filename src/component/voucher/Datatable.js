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
    console.log("vcodes:", this.state.vcodes);
    console.log("index:", index);
    console.log("status:", status);
  
    let vcodes = this.state.vcodes;
    if (vcodes[index]) {
      vcodes[index].status = !status;
      this.setState({ vcodes: vcodes }, () => {
        // console.log("Updated vcodes:", this.state.vcodes);
        this.props.updateVoucherRequest(this.state.vcodes[index]);
      });
    }
    //  else {
      // console.log("Invalid index or vcodes data:", index, vcodes);
    // }
  };
  

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10), page: 0 });
  };

  handleToggleVoucher = (index) => {
    const { vcodes } = this.state;
    const updatedVcodes = [...vcodes];
    updatedVcodes[index].enabled = !updatedVcodes[index].enabled;
    this.setState({ vcodes: updatedVcodes });
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
              {this.props.allvouchers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, index) => (
                <TableRow key={data.id}>
                  <TableCell component="th" scope="row">{index + 1}</TableCell>
                  <TableCell>{data.Vcode}</TableCell>
                  <TableCell>
                    <Switch
                      key={index}
                      // checked={this.state.status}
                      checked={data.status}
                      onChange={(e) => this.handleChange(index, data.status)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />

                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* rowpagination */}
          <TablePagination
            component="div"
            rowsPerPageOptions={[5, 10, 25]}
            count={vcodes.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={this.handleChangePage}
            onRowsPerPageChange={this.handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>
    );
  }
}

export default Datatable;