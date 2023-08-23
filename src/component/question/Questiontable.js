import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { Box, Button, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import TablePagination from '@mui/material/TablePagination';
import { DeleteOutlineSharp, EditNoteSharp } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import { dark } from '@mui/material/styles/createPalette';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import Snackbar from '@mui/material/Snackbar';
import { Cancel, CreateNewFolderOutlined } from '@mui/icons-material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import * as TablePaginationActions from "../common/TablePaginationActions";


const Questiontable = ({ allquestions }) => {
  const [data, setData] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState({});
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectedItemForDeletion, setSelectedItemForDeletion] = useState(null); // New state for selected item
  const [isEditMode, setEditMode] = useState(false);
  const [editQuestionData, setEditQuestionData] = useState({});
  const [selectedExam, setExam] = useState('');
  const [questions, setquestions] = useState([]);
  const [question, setquestion] = useState('');
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [answer, setanswer] = useState('');
  const [options, setOptions] = useState([

    { id: 1, text: '' },
    { id: 2, text: '' },
    { id: 3, text: '' },
    { id: 4, text: '' },
  ]);

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const handleEdit = (itemId) => {
    const questionToEdit = questions.find(item => item.id === itemId);
    setEditQuestionData(questionToEdit);
    setEditMode(true);
    setFormVisible(true); // Show the form when editing
  };

  const handleOptionChange = (e, optionIndex) => {
    const newText = e.target.value;
    setOptions((prevOptions) =>
      prevOptions.map((option, index) =>
        index === optionIndex ? { ...option, text: newText } : option
      )
    );
  };


  const handleClearForm = () => {
    setquestion('');
    setOptions([
      { id: 1, text: '' },
      { id: 2, text: '' },
      { id: 3, text: '' },
      { id: 4, text: '' },
    ]);
    setanswer('');
  };



  useEffect(() => {
    if (isEditMode) {
      setquestion(editQuestionData.question);
      setOptions(
        editQuestionData.options.map((text, index) => ({
          id: index + 1,
          text,
        }))
      );
      setanswer(editQuestionData.answer);
    }
  }, [isEditMode, editQuestionData]);


  // ADD FORM CODE

  const handleAdd = (e) => {
    if (!(selectedExam) || !(question) || !(options[0].text) || !(options[1].text) || !answer) {
      return;
    }
    const newQuestion = {
      question,
      options: options.map((option) => option.text),
      answer,
      examId: selectedExam,
    };

    const showSnackbar = (message) => {
      setSuccessMessage(message);
      setShowSuccessSnackbar(true);
    };

    
    axios.post('http://localhost:8888/questions', newQuestion).then((res) => {
      console.log(res.data);
      setquestion({ question: allquestions })
      setOptions(
        allquestions.options && allquestions.options.map((text, index) => ({
          id: index + 1,
          text,
        }))
      );
      showSnackbar('Question added successfully');
      setanswer(allquestions.answer);
      handleClearForm();
    })

    setFormVisible(false);

  

  };

  
  const handleUpdate = () => {
    const updatedQuestion = {
      id: editQuestionData.id, 
      question,
      options: options.map(option => option.text),
      answer,
      examId: selectedExam,
    };
    const showSnackbar = (message) => {
      setSuccessMessage(message);
      setShowSuccessSnackbar(true);
    };

    axios.put(`http://localhost:8888/questions/${updatedQuestion.id}`, updatedQuestion)
      .then(response => {
        showSnackbar('Question updated successfully');
        setFormVisible(false);
        setEditMode(false);
      })


  }


  // ADD FORM COMP

  const renderAddQueForm = () => {
    return (
      <Dialog open={isFormVisible} onClose={() => setFormVisible(false)}>
        <DialogContent>
          <Box
            component="form"
            sx={{

              width: 400,
              maxWidth: '500%',

            }}
            noValidate
            autoComplete="off"
          >

            {isFormVisible && (
              <div>
                <div className='pull-right'>
                  <Button
                    color='error'
                    onClick={() => setFormVisible(false)}
                    endIcon={<Cancel />}
                  >
                  </Button>
                </div>

                <div className=' mb-n4'>
                  <div className="text-center mt-4 mb-2">
                    {isEditMode && (
                      <h3>Edit Question</h3>
                    )}
                    {!isEditMode && (
                      <h3 > Add Question</h3>
                    )}
                  </div><br />
                  <div>
                    <TextField
                      required
                      variant='standard'
                      fullWidth
                      label="Question"
                      id="fullwidth"
                      focused
                      value={question}
                      onChange={(e) => setquestion(e.target.value)}

                    />
                    {options.map((option, index) => (
                      <div key={option.id}><br />
                        <TextField
                          variant='standard'
                          fullWidth
                          id="fullwidth"
                          label={`Option ${index + 1}`}
                          focused
                          required={index > 1 ? false : true}
                          value={option.text}
                          onChange={(e) => handleOptionChange(e, index)}

                        />
                      </div>
                    ))}<br />
                    <TextField
                      variant='standard'
                      fullWidth
                      id="outlined-password-input"
                      label="Answer"
                      value={answer}
                      focused
                      required
                      onChange={(e) => setanswer(e.target.value)}
                    />
                  </div>
                  {isEditMode && (
                    <div>
                      <Button
                        sx={{ marginTop: 3 }}
                        variant='contained'
                        color='primary'
                        type='button'
                        onClick={() => handleUpdate()}
                        className='btn btn-outline-primary ml-5 btn-lg'
                      >
                        Update
                      </Button>
                    </div>
                  )}

                  {!isEditMode && (
                    <div className='pull-left mb-3'><br />
                      <Button variant='contained' color='secondary' type='button' onClick={() => handleAdd()} className='btn btn-outline-success ml-5 btn-lg ' >Add</Button>
                    </div>
                  )}
                  {!isEditMode && (
                    <div className='text-right'>
                      <Button sx={{ marginTop: 3 }} variant='contained' color='error' type='button' onClick={() => handleClearForm()} className='btn btn-outline-danger pull-right btn-lg ' >Clear</Button>
                    </div>
                  )}
                </div>
              </div>

            )}
          </Box>
        </DialogContent>
      </Dialog>
    )
  }

  useEffect(() => {
    axios.get(`http://localhost:8888/examData/`)
      .then(response => {
        const examData = response.data;
        setData(examData);
      })
      .catch(error => {
        console.error('Error fetching exam data:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedExam) {
      axios.get(`http://localhost:8888/questions`)
        .then(response => {
          const questions = response.data && response.data.filter((item) => item.examId === selectedExam);
          setquestions(questions);
        })
        .catch(error => {
          console.error('Error fetching exam data:', error);
        });
    }
  }, [selectedExam]);


  const handleDelete = (itemId) => {
    setSelectedItemForDeletion(itemId); // Set the selected item for deletion
  };

  const showSnackbar = (message) => {
    setSuccessMessage(message);
    setShowSuccessSnackbar(true);
  };

  const confirmDelete = () => {
    axios.delete(`http://localhost:8888/questions/${selectedItemForDeletion}`)
      .then(response => {
        showSnackbar('Question deleted successfully');
        setSelectedItemForDeletion(null);
      })
      .catch(error => {
        console.error('Error deleting question:', error);
      });
    
  };


  // useEffect(() => {
  //   const data = allquestions && allquestions.length > 0 ? allquestions : [];
  //   setData(data);
  // },[]);

  // useEffect(() => {
  //   const data = allquestions && allquestions.length > 0 ? allquestions : [];
  //   setData(data);

  // },[allquestions])


  const handleCollapseToggle = (itemId) => {
    setSelectedOption((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId]
    }));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDropdownChange = (event) => {
    setSelectedOption({})
    const selectedExam = event.target.value;
    setExam(selectedExam);

  }

  /* QUESTION TABLE CODE */

  return (

    <div className='question'>
      <FormControl variant="standard" sx={{ m: 3, marginLeft: 70, minWidth: 160 }}>
        <InputLabel id="demo-simple-select-standard-label">Select Exam</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={selectedExam}
          onChange={(e) => handleDropdownChange(e)}
          label="Select Exam"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {data.map(exam => (
            <MenuItem key={exam.examCode} value={exam.id}>
              {exam.examName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div>
        <Box marginRight={10}>
          {selectedExam && (
            <div className='pull-left' >
              <Button sx={{ marginTop: 5, marginBottom: 2 }} color='inherit' variant='contained' type='button' onClick={() => setFormVisible(true)} endIcon={<CreateNewFolderOutlined />}>Create</Button>
            </div>
          )}
          <TableContainer component={Paper}  >
            <Table stickyHeader aria-label="sticky table"  >

              <TableHead sx={{ color: 'white', backgroundColor: '#1976d2', fontSize: 40, height: 60 }}   >
                Questions
              </TableHead>
              <TableBody color='secondary-color'>
                {questions.length > 0 ? (
                  questions.slice(startIndex, endIndex).map((item) => (
                    <React.Fragment key={item.id}>
                      <TableRow hover onClick={() => handleCollapseToggle(item.id)} >
                        <TableCell >{item.question}</TableCell>
                      </TableRow >
                      {selectedOption[item.id] && (
                        <TableRow >
                          <TableCell height={2}>
                            {item.options.map((option, index) => (
                              <div key={option}>
                                {item.options.length > 2 && (
                                  <label>{String.fromCharCode(97 + index)}.</label>
                                )}
                                <label>{option}</label>
                              </div>
                            ))}<br></br>
                            Answer :  {item.answer}
                            <div>
                              <Grid marginLeft={100} item xs={4}>
                                <Button onClick={() => handleDelete(item.id)}>
                                  <DeleteOutlineSharp sx={{ color: dark[500] }} /></Button>
                                <Button onClick={() => handleEdit(item.id)}>
                                  <EditNoteSharp sx={{ color: dark[500] }} /></Button>
                              </Grid>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <TableRow>
                    <TableCell height='100px' align='center' >NO DATA</TableCell>
                  </TableRow>
                )}
                <TablePagination className='pull-right'
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={7} // Adjust the colSpan value according to your table structure
                  count={questions.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions.default} // Imported component
                />
              </TableBody>
            </Table>
          </TableContainer>

        </Box>
        {
          renderAddQueForm()
        }
      </div>
      <Snackbar
        open={showSuccessSnackbar}
        autoHideDuration={2000} // Adjust the duration as needed
        onClose={() => setShowSuccessSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={() => setShowSuccessSnackbar(false)}
          severity="success"
        >
          {successMessage}
        </Alert>
      </Snackbar>

      <Dialog open={selectedItemForDeletion !== null} onClose={() => setSelectedItemForDeletion(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          {selectedItemForDeletion && (
            <div>
              Are you sure you want to delete the following question?
              <div>{questions.find(item => item.id === selectedItemForDeletion)?.question}</div>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedItemForDeletion(null)}>Cancel</Button>
          <Button variant='contained' color="error" onClick={() => confirmDelete()}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default Questiontable;