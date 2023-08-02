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
    { id: 'firstname', label: 'firstname', minWidth: 170 },
    // { id: 'lname', label: 'ISO\u00a0Code', minWidth: 100 },
    // 
    
  ];
  
  function createData(firstname,  lastname) {
    // const density = population / size;
    return { firstname,lastname };
        // code, population, size, density };
  }
  
  const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    // ... (remaining rows)
  ]; 
  
export class StudentDashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
          students: [],
          id: null,
          firstname: '',
          lastname: '',
          email: '',
          contact: '',
          dob: '',
          gender: '',
          organization: '',
          term: false
        }
    }
    
    componentDidMount() {
        this.fetchData();
    }
    
    fetchData = () => {
        axios.get("http://localhost:8888/students").then((res) => {
            console.log(res.data);
            this.setState({ students: res.data });
        })
    }

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: +event.target.value, page: 0 });
  };

  
  deleteRecord = (id) => {
    if (window.confirm(`Are you sure? you want to remove product: `)) {
        let url = `${"http://localhost:8888/students"}/${id}`
        axios.delete(url).then(() => {
            window.alert("Product Deleted successfully")
            this.fetchData()
           
        })

        // this.props.initProductRequest()
        // this.props.deleteProductRequest(id)
        window.alert("Student Deleted successfully")

    }


}


  render() {
    const { page, rowsPerPage,students,gender} = this.state;

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
                                <TableCell align="center">contact</TableCell>
                                <TableCell align="center">dob</TableCell>
                                <TableCell align="center">Gender</TableCell>
                                <TableCell align="center">organization</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                         
                         {students.map((val) => {
                                return <TableRow>
                                    <TableCell component="th" scope="row">{val.id}</TableCell>
                                     <TableCell align='center' >{val.firstname}</TableCell >
                                     <TableCell align='center'>{val.lastname}</TableCell >
                                     <TableCell align='center'>{val.email}</TableCell>
                                     <TableCell align='center'>{val.contact}</TableCell>
                                     <TableCell align='center' >{val.dob}</TableCell>
                                     <TableCell align='center' >{val.gender}</TableCell>
                                     <TableCell align='center' >{val.organization}</TableCell>
                                     {/* <TableCell align="right">{val.Grade}</TableCell>
                                     <TableCell align="right">{val.Date}</TableCell>  */}
                                     <TableCell align="right">
                                      <button onClick={()=>this.deleteRecord(val.id)} className='btn btn-outline-danger btn-lg'
                                       ><i class="fa fa-ban" aria-hidden="true"></i>Delete</button>
                                       </TableCell> 
                            </TableRow>                   
                              
                            })}
                             
                        </TableBody>

                    </Table>
                    <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 25]}
          count={students.length}
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
export default StudentDashboard