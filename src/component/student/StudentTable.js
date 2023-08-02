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
  
const columns = [
    { id: 'fname', label: 'fName', minWidth: 170 },
    // { id: 'lname', label: 'ISO\u00a0Code', minWidth: 100 },
    // 
    
  ];
  
  function createData(fname,  lname) {
    // const density = population / size;
    return { fname,lname };
        // code, population, size, density };
  }
  
  const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    // ... (remaining rows)
  ]; 
  
export class StudentTable extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: [],
            id: null,
            fname: "",
            lname: "",
            role:"",
            password: "",
            contact: "",
            gender: "",
            email: "",
            page: 0,
            rowsPerPage: 10,
        }
    }
    
    componentDidMount() {
        this.fetData();
    }
    
    fetData = () => {
        axios.get("http://localhost:8888/user").then((res) => {
            console.log(res.data);
            this.setState({ user: res.data });
        })
    }

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: +event.target.value, page: 0 });
  };

  render() {
    const { page, rowsPerPage,user } = this.state;

    return (
<div className='container'>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell  >SrNo</TableCell>
                                <TableCell  align="center">First Name</TableCell>
                                <TableCell  align="center">Last Name</TableCell>
                                <TableCell align="center" >Email</TableCell>
                                <TableCell align="center">Password</TableCell>
                                <TableCell align="center">Role</TableCell>
                                <TableCell align="center">Gender</TableCell>
                                <TableCell align="center">Contact</TableCell>
                                
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                         
                         {user.map((val) => {
                                return <TableRow>
                                    <TableCell component="th" scope="row">{val.id}</TableCell>
                                     <TableCell>{val.fname}</TableCell >
                                     <TableCell>{val.lname}</TableCell >
                                     <TableCell  >{val.email}</TableCell>
                                     <TableCell  >{val.password}</TableCell>
                                     <TableCell  >{val.role}</TableCell>
                                     <TableCell  >{val.gender}</TableCell>
                                     <TableCell  >{val.contact}</TableCell>
                                     {/* <TableCell align="right">{val.Grade}</TableCell>
                                     <TableCell align="right">{val.Date}</TableCell>  */}
                                     <TableCell align="right"><button onClick={()=>this.deletedata(val.id)} 
                                       ><i class="fa fa-trash-o" aria-hidden="true"></i></button></TableCell> 
                            </TableRow>
                        
                                  
                                   
                               
                            })}
                             
                        </TableBody>

                    </Table>
                    <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 25]}
          count={user.length}
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
export default StudentTable