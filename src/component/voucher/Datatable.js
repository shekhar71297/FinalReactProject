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
      status: true,
      vcodes: [],
      page: 0,
      rowsPerPage: 5,

    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.allvouchers !== this.props.allvouchers) {
      this.setState({ vcodes: this.props.allvouchers });
    }
  }

  componentDidMount() {
    this.props.initVoucherRequest()
  }

  handleChange = (index, currentStatus,id) => {
    const { vcodes } = this.state;
  const updatedVcodes = [...vcodes];
  updatedVcodes[index] = { ...updatedVcodes[index], status: !currentStatus };

  this.setState({ vcodes: updatedVcodes });

  const updatedVoucher = updatedVcodes[index];

  if (id) {
    axios.put(`http://localhost:8888/vcodes/${updatedVoucher.id}`, updatedVoucher)
      .then((res) => {
        console.log('Voucher updated:', res.data);
      })
      .catch((error) => {
        console.error('Error updating voucher:', error);
      });
  }  else {
      // console.error('Updated voucher does not have a valid ID.');
    }
  };
  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10), page: 0 });
  };


  render() {
      const { page, rowsPerPage } = this.state;
    
      return (
        <div className='container'>
          <hr />
          <TableContainer component={Paper} style={{ marginTop: '50px' }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="left">Voucher Code</TableCell>
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.allvouchers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, index) => {
                  const currentindex = page * rowsPerPage + index;
                  return (
                    <TableRow key={currentindex}>
                      <TableCell component="th" scope="row">{currentindex + 1}</TableCell>
                      <TableCell>{data.Vcode}</TableCell>
                      <TableCell>
                        <Switch
                          checked={data.status}
                          onChange={() => this.handleChange(currentindex, data.status, data.id)}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            {/* rowpagination */}
            <TablePagination
              component="div"
              rowsPerPageOptions={[5, 10, 25]}
              count={this.props.allvouchers.length}
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