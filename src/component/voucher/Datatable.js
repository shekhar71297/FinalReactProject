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
// import Vouchercode from './Vouchercode';

export class Datatable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switchindex:null,
      status: true,
      vcodes: [],
      page: 0,
      rowsPerPage: 5,
    
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios.get("http://localhost:8888/vcodes").then((res) => {
      console.log(res.data);
      this.setState({ vcodes: res.data });
    });
  };


  handleChange = (index,status,event) => {
    let vcodes = this.state.vcodes;
    // console.log("before",vcodes,index,vcodes[index]);
    vcodes[index].status = !status;
    // console.log("after",vcodes);
    this.setState({ vcodes:vcodes},() => console.log(this.state.vcodes[index]));
   

    this.setState({ vcodes }, () => {
      const putvoucher = vcodes[index];
      axios.put(`http://localhost:8888/vcodes/${putvoucher.id}`, putvoucher)
        .then((res) => {
          console.log( res.data);
        })
        .catch((error) => {
          console.error( error);
        });
    });
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
      <div className='container'>
 {/* <Vouchercode voucherCode={vcodes} /> */}
         {/* <Vouchercode
          voucherCode={vcodes.find((data, index) => index === this.state.switchindex)}
          voucherData={vcodes} */}
        {/* /> */}

        <hr />
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="left">Voucher Code</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vcodes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, index) => (
                <TableRow key={data.id}>
                  <TableCell component="th" scope="row">{index+1}</TableCell>
                  <TableCell>{data.Vcode}</TableCell>
                  <TableCell>
                    <Switch
                      key={index}
                      // checked={this.state.status}
                      checked={data.status}
                      onChange={(e)=>this.handleChange(index,data.status)}
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