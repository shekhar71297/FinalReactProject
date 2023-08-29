
import React, { Component } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/material';
import { TextField, Button, Grid, Container, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Typography } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import * as TablePaginationActions from "../common/TablePaginationActions";
import * as validation from '../../util/validation';
import DialogBox from '../common/DialogBox';

export class ExamModule extends Component {
    constructor(props) {
        super(props)

        this.state = {
            exams: [],
            isDeletePopupOpen: false,
            deletingRecordId: null,
            isDetailsPopupOpen: false,
            id: null,
            isAddExam: true,
            snackbarOpen: false,
            snackbarMessage: '',
            status: true,
            open: false,
            page: 0,
            rowsPerPage: 5,
            searchQuery: '',
            toggle: [],
            examStatus: true,
            selectedExam: {
                id: null,
                examCode: "",
                examName: "",
                examStatus: false
            },
            errors: {
                examCode: false
            },
        };

    }

    componentDidUpdate(prevProps) {
        if (prevProps.allExam !== this.props.allExam) {
            this.setState({ exams: this.props.allExam }, () => console.log("updated", this.state.exams));
            // console.log("updated all exam data", this.props.allExam);
        }
        if (prevProps.singleExam !== this.props.singleExam) {
            const { id = 0, examCode = "", examName = "", examStatus = false } = this.props.singleExam;
            this.setState({
                id,
                examCode,
                examName,
                examStatus,
                selectedExam: {
                    ...this.state.selectedExam,
                    id,
                    examCode,
                    examName,
                    examStatus,
                }
            });
        }
    }

    componentDidMount() {
        this.props.initexamRequest()

    }

    handleExamChange = (event) => {
        const { name, value, type } = event.target;

        // If the input type is radio, update the value based on the event
        const newValue = type === 'radio' ? (value === 'true') : value;

        this.setState((prevState) => ({
            selectedExam: {
                ...prevState.selectedExam,
                [name]: newValue
            }
        }), () => {
            if (name === "examCode") {
                const codeError = !(validation.isValidexamcode(this.state.selectedExam.examCode));
                this.setState(prevState => ({
                    errors: {
                        ...prevState.errors,
                        codeError: codeError
                    }
                }));
            }
        });
    };

    toggelChange = (index, newExamStatus) => {
        const { page, rowsPerPage, exams } = this.state;
        // let exams = this.state.exams;
        const dataindex = page * rowsPerPage + index;

        exams[dataindex].examStatus = newExamStatus
        console.log("updated exam", exams[dataindex]);
        this.setState({ exams: exams }, () => {
            const updatedExams = exams[dataindex];
            this.props.updateexamRequest(updatedExams);
        });
    };

    // delete action 
    // Function to open the delete popup model
    openDeletePopup = (id) => {
        this.setState({ isDeletePopupOpen: true, deletingRecordId: id });
    };
    // Function to close the delete popup model
    closeDeletePopup = () => {
        this.setState({ isDeletePopupOpen: false, deletingRecordId: null });
    };

    deleteexam = (id) => {
        this.openDeletePopup(id);
    };
    handleDeleteConfirmed = () => {
        const { deletingRecordId } = this.state;
        this.props.deleteexamRequest(deletingRecordId);
        this.closeDeletePopup();
        this.setState({
            snackbarOpen: true,
            snackbarMessage: 'exam deleted successfully',
            severity: "error"
        });
    };

    // for add-update onchange method
    updateExam = (event) => {
        event.preventDefault();

        if (this.state.errors.examCode) {
            this.setState({
                snackbarOpen: true,
                snackbarMessage: "please fix validiation error before submiting", severity: "error"
            })
            return;
        }

        const { id, examCode, examName, examStatus } = this.state.selectedExam;

        const updatedExam = {
            id,
            examCode,
            examName,
            examStatus,
        };
        const isAddDuplicate = this.state.exams.some(exam => exam.examName === examName || exam.examCode === examCode);

        if (this.state.isAddExam) {
            if (isAddDuplicate) {
                this.setState({
                    snackbarOpen: true,
                    snackbarMessage: 'An exam with the same code already exists.',
                    severity: "error"
                });
            }
            else {
                this.props.addexamRequest(updatedExam);

                this.setState({
                    snackbarOpen: true,
                    snackbarMessage: ' exam added successfully',
                    severity: "success"
                });
                this.props.initexamRequest()
            }

        } else {


            this.props.initexamRequest()
            this.props.updateexamRequest(updatedExam);
            this.setState({
                snackbarOpen: true,
                snackbarMessage: 'exam update successfully',
                severity: "success"
            });
        }
        this.handleClose();
        this.props.initexamRequest()
    };
    // validation for exam code 
    handleClose = () => {
        this.props.initexamRequest()
        this.setState({ open: false });
    };
    //to popup add exam popup 
    handleOpen = (id = null) => {
        if (id !== null) {
            const data = this.state.exams.find(item => item.id === id);
            if (data) {
                this.setState({
                    selectedExam: { ...data },
                    open: true,
                    isAddExam: false
                });
            }
        } else {
            this.setState({
                selectedExam: {
                    id: null,
                    examCode: '',
                    examName: '',
                    examStatus: false
                },
                open: true,
                isAddExam: true
            });
        }

    };
    // Function to open the delete popup model
    openConfirmDialog = (id) => {
        this.setState({
            confirmDialogOpen: true,
            recordToDeleteId: id,
        });
    };

    closeConfirmDialog = () => {
        this.setState({
            confirmDialogOpen: false,
            recordToDeleteId: null,
        });
    };
    // pagination

    handleChangePage = (event, newPage) => {
        this.setState({ page: newPage });
    };

    // Handler for changing rows per page
    handleChangeRowsPerPage = (event) => {
        this.setState({ rowsPerPage: parseInt(event.target.value, 10), page: 0 });
    };

    // Handler for search query change
    handleSearchChange = (event) => {
        this.setState({ searchQuery: event.target.value, page: 0 }, () => {
            // After updating the search query, update filteredExams

        });
    };
    // close alert message 
    closeSnackbar = () => {
        this.setState({
            snackbarOpen: false,
            snackbarMessage: '',
        });
    };
    render() {

        const { isDeletePopupOpen, open, rowsPerPage, page, searchQuery, examCode, examName } = this.state
        const filteredexam = this.props.allExam && this.props.allExam.filter((val) => {
            const searchQuery = this.state.searchQuery;
            const codeIncludes = val.examCode.toLowerCase().includes(searchQuery);
            const nameludes = val.examName.toLowerCase().includes(searchQuery);
            return codeIncludes || nameludes
        }) || [];

        const isSubmitDisabled = !this.state.selectedExam.examCode ||
            !this.state.selectedExam.examName ||
            this.state.errors.codeError ||
            this.state.errors.examnameError;

        return (
            <div>
                <Box sx={{ marginRight: "25px", marginTop: 7, position: "relative", right: 20 }}>
                    <Paper>
                        <TableContainer component={Paper}  >
                            <Table aria-label="simple table" sx={{}} >
                                <TableHead >
                                    <TableRow>
                                        <TableCell align="center" colSpan={7} sx={{ backgroundColor: '#1976d2', fontSize: "25px", fontWeight: "bolder", color: "white" }}>
                                            <Grid className='resultheader' container alignItems="center" justifyContent="space-between" style={{ position: 'relative', overflow: "auto", top: 0, zIndex: 1, }}>
                                                <Grid item>
                                                    Manage Exam
                                                </Grid>
                                                <Grid item>

                                                    <TextField
                                                        className='searchinput'
                                                        type="text"
                                                        value={searchQuery}
                                                        onChange={this.handleSearchChange}
                                                        placeholder="Search Exam"
                                                        // label="Search Result"

                                                        variant="standard"
                                                        sx={{
                                                            backgroundColor: 'white',
                                                            padding: "2px 3px",
                                                            borderRadius: "4px",
                                                            width: "auto",

                                                        }}
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="end">
                                                                    <SearchIcon />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                    <Button variant="contained" color="primary" sx={{ marginTop: 4 }} size="small" type="button" onClick={() => (this.handleOpen())}><AddIcon />Exam</Button>
                                    <TableRow>
                                        <TableCell ><Typography component="span" variant="subtitle1" sx={{ fontWeight: "bold" }}>SrNo</Typography></TableCell>
                                        <TableCell align="center"><Typography component="span" variant="subtitle1" sx={{ fontWeight: "bold" }}>Code</Typography></TableCell>
                                        <TableCell align="center"><Typography component="span" variant="subtitle1" sx={{ fontWeight: "bold" }}>ExamName</Typography></TableCell>
                                        <TableCell align="center"><Typography component="span" variant="subtitle1" sx={{ fontWeight: "bold" }}>ExamStatus</Typography></TableCell>
                                        <TableCell align="center"><Typography component="span" variant="subtitle1" sx={{ fontWeight: "bold" }}>Action</Typography></TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredexam && filteredexam.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={8} align="center">
                                                <strong style={{ fontSize: "28px" }}>No data found</strong>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredexam && filteredexam.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((val, index) => {
                                            const currentIndex = page * rowsPerPage + index;
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell align='center'>{currentIndex + 1}</TableCell>
                                                    <TableCell align='center'>{val.examCode}</TableCell>
                                                    <TableCell align='center'>{val.examName}</TableCell>
                                                    <TableCell align='center'>
                                                        <Switch
                                                            checked={val.examStatus}
                                                            onChange={() => this.toggelChange(index, !val.examStatus)}
                                                            inputProps={{ 'aria-label': 'controlled' }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align='center'>
                                                        <Button onClick={() => this.deleteexam(val.id)} align="cnter">
                                                            <DeleteIcon />
                                                        </Button>
                                                        <Button onClick={() => this.handleOpen(val.id)}>
                                                            <EditIcon />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    )}

                                </TableBody>
                            </Table>
                        </TableContainer>
                        <DialogBox
                    
                            open={open}
                            onClose={this.handleClose}
                            onConfirm={(event) => {
                                this.handleClose()
                                this.updateExam(event)

                            }}
                            message={`Are you sure you want to ${this.state.isAddExam ? 'add' : 'update'} this exam?`} title={this.state.isAddExam ? 'Add Exam' : 'Update Exam'}
                            content={
                                <form onSubmit={(event) => this.updateExam(event)}>
                                    <Grid container spacing={2} sx={{marginTop:2}}>
                                        <Grid item xs={12} >
                                            <TextField
                                                required
                                                label="Exam Code"
                                                variant="outlined"
                                                fullWidth
                                                name="examCode"

                                                value={this.state.selectedExam.examCode}
                                                onChange={this.handleExamChange}
                                                error={this.state.errors.codeError}
                                                helperText={this.state.errors.codeError && validation.errorText("Please enter a valid code ") || 'eg:HI-3'}
                                            />
                                        </Grid>
                                        <Grid item xs={12} >
                                            <TextField
                                                required
                                                label="Exam Name"
                                                variant="outlined"
                                                fullWidth
                                                name="examName"
                                                value={this.state.selectedExam.examName}
                                                onChange={this.handleExamChange}
                                                error={this.state.errors.examnameError}
                                                helperText={this.state.errors.examnameError && validation.errorText("Please enter an exam name") || 'eg:Java,php'}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControl component="fieldset">
                                                <FormLabel component="legend">Exam Status</FormLabel>
                                                <RadioGroup aria-label="examstatus" name="examStatus">
                                                    <FormControlLabel
                                                        value={false}
                                                        control={<Radio />}
                                                        label="Disabled"
                                                        checked={!this.state.selectedExam.examStatus}
                                                        onChange={this.handleExamChange}
                                                    />
                                                    <FormControlLabel
                                                        value={true}
                                                        control={<Radio />}
                                                        label="Enabled"
                                                        checked={this.state.selectedExam.examStatus}
                                                        onChange={this.handleExamChange}
                                                    />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </form>
                            }
                            disable={isSubmitDisabled}
                            submitLabel={this.state.isAddExam ? 'Add Exam' : 'Update Exam'}
                        />
                        <DialogBox
                            open={isDeletePopupOpen}
                            onClose={this.closeDeletePopup}
                            onConfirm={() => {
                                this.closeDeletePopup();
                                this.handleDeleteConfirmed();
                            }}
                            message={`Are you sure you want to delete this record?`}
                            title={`Delete Record`}
                            submitLabel={`Delete`}

                        />
                        <Snackbar
                            open={this.state.snackbarOpen}
                            autoHideDuration={3000} // You can adjust the duration as needed
                            onClose={() => this.setState({ snackbarOpen: false })}
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        >
                            <MuiAlert onClose={this.closeSnackbar}
                               severity={this.state.severity}
                                variant="filled"
                                sx={{ width: '100%' }}>
                                {this.state.snackbarMessage}
                            </MuiAlert>
                        </Snackbar>
                        {/* table pagination */}

                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            colSpan={7} // Adjust the colSpan value according to your table structure
                            count={filteredexam.length}
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
                    </Paper>
                </Box>
            </div>
        )
    }
}
export default ExamModule
