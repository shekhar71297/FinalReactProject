import React, { Component } from 'react';
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
      randomVoucherCode: this.generateRandomVoucherCode(),
      selectedId: null, 

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
  // componentDidMount() {
  //   this.props.initVoucherRequest() 
  //   this.randomCodeInterval = setInterval(() => {
  //     this.updateRandomVoucherCode();
  //   }, 1000); 
  // }
  componentDidMount() {
    this.props.initVoucherRequest();
    

    // Set up an interval to check and generate a new voucher code every hour
    this.randomCodeInterval = setInterval(() => {
      if (!this.state.status && this.state.selectedId !== null) {
        // Generate a new voucher code when the switch is off and a selection is made
        const newRandomCode = this.generateRandomVoucherCode();
        this.updateVoucherCodeInDatabase(this.state.selectedId, newRandomCode);
      }
    }, 3600000); // 3600000 milliseconds = 1 hour
  }
  componentWillUnmount() {
    // Clear the interval when the component is unmounted
    clearInterval(this.randomCodeInterval);
  }

  generateRandomVoucherCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let voucherCode = '';
    for (let i = 0; i < 6; i++) {
      voucherCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return voucherCode;
  }
 
  updateVoucherCodeInDatabase(id, newCode) {
    // Simulate updating the voucher code in the JSON database
    const updatedVcodes = [...this.state.vcodes];
    const voucherIndex = updatedVcodes.findIndex((voucher) => voucher.id === id);

    if (voucherIndex !== -1) {
      updatedVcodes[voucherIndex].Vcode = newCode;
      this.setState({ vcodes: updatedVcodes });
    }
  }

    // Simulate writing the updated data back to the database
  //   this.setState({ vcodes: updatedVouchers });
  // }

  updateRandomVoucherCode() {
    const newRandomCode = this.generateRandomVoucherCode();
    this.setState({ randomVoucherCode: newRandomCode });

    // Call the function to update the code in the database
    this.updateRandomVoucherCodeInDatabase(newRandomCode);
  }


  handleChange = (index, status, event) => {
    const { page, rowsPerPage } = this.state;
    let vcodes = this.state.vcodes;
    const dataIndex = page * rowsPerPage + index;
    // console.log("before",vcodes,index,vcodes[index]);
    vcodes[dataIndex].status = !status;
    if (!vcodes[dataIndex].status) {
      //       // Generate a new voucher code when the switch is turned on
            const newRandomCode = this.generateRandomVoucherCode();
            this.state.vcodes[dataIndex].Vcode = newRandomCode;
            this.state.vcodes[dataIndex].status = vcodes[dataIndex].status;
          }
    // console.log("after",vcodes);
    this.setState({ vcodes: vcodes }, () => {
      // console.log(this.state.vcodes[dataIndex])
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
    const { page, rowsPerPage } = this.state;

    return (
      <div className='container' style={{ marginRight: '25px',marginTop:40 }} >
    
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={8} sx={{ backgroundColor: "#1976d2", fontSize: "25px", textAlign: "start", fontWeight: "bolder", color: "white" }}>
                  Manage Voucher</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>ID</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>Voucher Code</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }} >Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
             this.props.allvouchers && this.props.allvouchers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, index) => {
                  const currentIndex = page * rowsPerPage + index + 1;
                  return (
                    <TableRow key={data.id}>
                      <TableCell align="center" component="th" scope="row">{currentIndex}</TableCell>

                      <TableCell align="center">{data.Vcode}</TableCell>
                      <TableCell align="center">
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