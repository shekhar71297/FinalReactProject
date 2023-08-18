import React, { Component } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';
import { Typography, Box, Modal } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    overflow: 'auto',
    transform: 'translate(-50%, -50%)',
    width: 530,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    maxHeight: '93vh',
};

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
            open: false,
            page: 0,
            rowsPerPage: 5,
            searchQuery: '',
        }
    }

    componentDidMount() {
        this.props.initFeedbackRequest()
    }

    //to get data from server
    fetchData = () => {
        this.props.initFeedbackRequest()
    };
    handleClose = () => {
        this.setState({ selectedFeedback: null, open: false });
    };

    handleShow = (data) => {
        this.setState({ selectedFeedback: data, open: true });
        this.fetchData()
    }

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

    render() {
        const { page, rowsPerPage, selectedFeedback, searchQuery } = this.state;
        const { open } = this.state;
        const { allFeedback } = this.props;

        // Calculate the index of the first and last row on the current page
        const lastIndex = (page + 1) * rowsPerPage;
        const firstIndex = lastIndex - rowsPerPage;

        const filteredFeedback = this.props.allFeedback.filter((val) => {
            const searchQuery = this.state.searchQuery;
            const fNameIncludes = val.fname.toLowerCase().includes(searchQuery);
            const orgIncludes = val.org.toLowerCase().includes(searchQuery);
            const contactIncludes = val.contact.toLowerCase().includes(searchQuery);

            return fNameIncludes || orgIncludes || contactIncludes
        })

        return (
            <div className='container' style={{ marginRight: '30px' }}>

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
                        paddingBottom: 8,
                    }}
                />

                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                        <TableRow>
                                <TableCell align="center" colSpan={8} sx={{ backgroundColor: "#1976d2", fontSize: "25px", textAlign: "start", fontWeight: "bolder",color:"white" }}>
                                Feedback module</TableCell>
                        </TableRow>
                            <TableRow>
                                <TableCell align="center" style={{ fontWeight: '600' }}>SrNo</TableCell>
                                <TableCell align="center" style={{ fontWeight: '600' }}>Name</TableCell>
                                <TableCell align="center" style={{ fontWeight: '600' }} >Contact</TableCell>
                                <TableCell align="center" style={{ fontWeight: '600' }}>Organization</TableCell>
                                <TableCell style={{ fontWeight: '600' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredFeedback.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} align="center">
                                        <strong style={{ fontSize: "28px" }}>  No data found</strong>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredFeedback.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((val, index) => {
                                    const rowNumber = firstIndex + index + 1
                                    return <TableRow key={val.id}>
                                        <TableCell
                                            component="th" scope="row" align="center">{rowNumber}</TableCell>
                                        <TableCell align="center" >{val.fname}</TableCell>
                                        <TableCell align="center" >{val.contact}</TableCell>
                                        <TableCell align="center" >{val.org}</TableCell>
                                        <TableCell align="center">
                                            <Stack spacing={2} direction="row" >
                                                <Button onClick={() => this.handleShow(val)} type="button"><RemoveRedEyeIcon style={{ color: '#1976d2' }} /></Button>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                })
                            )
                            }
                        </TableBody>
                    </Table>

                    <Modal
                        open={open}
                        onClose={this.handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>

                            <Stack spacing={2} direction="row">
                                <Button onClick={this.handleClose} style={{ marginLeft: '395px', color: 'grey' }}><CloseIcon style={{ color: 'blue' }} /></Button>
                            </Stack>
                            <Typography id="modal-modal-title" variant="h6" component="h2" style={{ fontWeight: '700' }}>
                                Feedback Details
                            </Typography>

                            {selectedFeedback && (
                                <Table>
                                    <TableRow>
                                        <TableCell>Student Name: </TableCell><TableCell>{selectedFeedback.fname}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Contact No: </TableCell><TableCell>{selectedFeedback.contact}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Organization: </TableCell><TableCell>{selectedFeedback.org}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>1.What did you enjoy the most about the trainning?: </TableCell><TableCell><strong>Ans:  &nbsp;</strong>{selectedFeedback.queOne}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>2.How would you rate the quality of instruction provided by the faculty? </TableCell><TableCell><strong>Ans:  &nbsp;</strong>{selectedFeedback.queTwo}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>3. Was there any subject matter that you found confusing? If so, please provide specific examples.: </TableCell><TableCell> <strong>Ans:  &nbsp;</strong>{selectedFeedback.queThree}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>4. What is the most valuable thing you learned in course (knowledge or skills)?: </TableCell><TableCell><strong>Ans:  &nbsp;</strong>{selectedFeedback.queFour}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>5. Overall how is the faculty feedback? Any specific comments about faculty?: </TableCell><TableCell><strong>Ans:  &nbsp;</strong>{selectedFeedback.queFive}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>6. Any additional comments you wish to share?: </TableCell><TableCell><strong>Ans:  &nbsp;</strong>{selectedFeedback.queSix}</TableCell>
                                    </TableRow>
                                </Table>
                            )}
                            <Stack spacing={2} direction="row">
                                <Button onClick={this.handleClose} style={{ marginLeft: '380px', marginTop: '10px', color: 'blue' }}>Close</Button>
                            </Stack>
                        </Box>
                    </Modal>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    component="div"
                    count={allFeedback.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={this.handleChangePage}
                    onRowsPerPageChange={this.handleChangeRowsPerPage}
                />
            </div>
        );
    }
}

export default FeedDash;