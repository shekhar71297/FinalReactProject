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
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';


export class FeedDash extends Component {
    constructor(props) {
        super(props)

        this.state = {
            feedback: [],
            id: null,
            fname: "",
            email: "",
            contact: "",
            org: "",
            selectedFeedback: null,
            show: false,
            page: 0,
            rowsPerPage: 10,
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    //to get data from server
    fetchData = () => {
        axios.get('http://localhost:8888/feedback').then((res) => {
            console.log(res.data);
            this.setState({ feedback: res.data });
        })
    };
    handleClose = () => {
        this.setState({ selectedFeedback: null, show: false });
    };

    handleShow = (data) => {
        this.setState({ selectedFeedback: data, show: true });
        this.fetchData()
    };

    handleChangePage = (event, newPage) => {
        this.setState({ page: newPage });
    };

    handleChangeRowsPerPage = (event) => {
        // this.setState({ rowsPerPage: +event.target.value, page: 0 });
        this.setState({ rowsPerPage: parseInt(event.target.value, 10), page: 0 });

    };

    render() {
        const { page, rowsPerPage, feedback, selectedFeedback, show } = this.state;
        // Calculate the index of the first and last row on the current page
        const lastIndex = (page + 1) * rowsPerPage;
        const firstIndex = lastIndex - rowsPerPage;

        return (
            <div className='container'>
                {/* <Stack spacing={2} direction="row">
                    <Link to={'/feedback'}><Button variant="contained" className='btn-secondary mx-auto'><i class="fa fa-regular fa-comment">Add Feedback</i></Button></Link> 
                </Stack> */}

                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">SrNo</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Contact</TableCell>
                                <TableCell align="center">Organization</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {feedback.map((val) => {
                                return <TableRow >
                                    <TableCell
                                        component="th" scope="row" align="center">{val.id}</TableCell>
                                    <TableCell align="center" >{val.fname}</TableCell>
                                    <TableCell align="center" >{val.contact}</TableCell>
                                    <TableCell align="center" >{val.org}</TableCell>
                                    <TableCell align="center"><button className='btn-primary' onClick={() => this.handleShow(val)}>
                                    <i class="fa fa-solid fa-eye"></i>                                  
                                    </button></TableCell>
                                </TableRow>
                            })}

                        </TableBody>
                    </Table>

                    <Modal
                        show={show}
                        onHide={this.handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Feedback Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {selectedFeedback && (
                                <table>
                                    <tr>
                                        <td>Student Id : </td><td>{selectedFeedback.id}</td>
                                    </tr>
                                    <tr>
                                        <td>Name : </td><td>{selectedFeedback.fname}</td>
                                    </tr>
                                    <tr>
                                        <td>Contact : </td><td>{selectedFeedback.contact}</td>
                                    </tr>
                                    <tr>
                                        <td>Organization : </td><td>{selectedFeedback.org}</td>
                                    </tr>
                                    <tr>
                                        <td>1.What did you enjoy the most about the tranning? : </td><td>{selectedFeedback.queOne}</td>
                                    </tr>
                                    <tr>
                                        <td>2. Please list 2-3 key learnings from course curriculum, and how you anticipate applying them to your work in the future. : </td><td>{selectedFeedback.queTwo}</td>
                                    </tr>
                                    <tr>
                                        <td>3. Was there any subject matter that you found confusing? If so, please provide specific examples. : </td><td>{selectedFeedback.queThree}</td>
                                    </tr>
                                    <tr>
                                        <td>4. What is the most valuable thing you learned in course (knowledge or skills)? : </td><td>{selectedFeedback.queFour}</td>
                                    </tr>
                                    <tr>
                                        <td>5. Overall how is the faculty feedback? Any specific comments about faculty? : </td><td>{selectedFeedback.queFive}</td>
                                    </tr>
                                    <tr>
                                        <td>6. Any additional comments you wish to share? : </td><td>{selectedFeedback.queSix}</td>
                                    </tr>

                                </table>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>


                    <TablePagination
                        
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={feedback.length}
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
export default FeedDash