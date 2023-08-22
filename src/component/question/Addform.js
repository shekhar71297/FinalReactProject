import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import axios from 'axios';
import { Button, TableContainer } from '@mui/material';
import { Cancel, CreateNewFolderOutlined } from '@mui/icons-material';
import { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Snackbar from '@mui/material/Snackbar';
import { connect } from 'react-redux';
import * as actions from '../../pages/question/action'


const Addform = ({ isEditMode, editQuestionData,allquestions, addQuestionRequest, setEditMode, setEditQuestionData }) => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [question, setquestion] = useState('');
  const [options, setOptions] = useState([
    { id: 1, text: '' },
    { id: 2, text: '' },
    { id: 3, text: '' },
    { id: 4, text: '' },
  ]);
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedExam, setSelectedExam] = useState(null);
  const [answer, setanswer] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const examDatabaseEndpoints = {
    react: 'react',
    python: 'python',
    php: 'php',
    // Add more exam endpoints as needed
  };



  const handleOptionChange = (e, optionIndex) => {
    const newText = e.target.value;
    setOptions((prevOptions) =>
      prevOptions.map((option, index) =>
        index === optionIndex ? { ...option, text: newText } : option
      )
    );
  };
         
  const showSnackbar = (message) => {
    setSuccessMessage(message);
    setShowSuccessSnackbar(true);
  };

  useEffect(() => {
    if (isEditMode) {
      setquestion(editQuestionData.question);
      // Assuming editQuestionData.options is an array of options
      setOptions(
        editQuestionData.options.map((text, index) => ({
          id: index + 1,
          text,
        }))
      );
      setanswer(editQuestionData.answer);
    }
  }, [isEditMode, editQuestionData]);

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

  const newQuestion = {
    question,
    options: options.map((option) => option.text),
    answer,
    allquestions
  };
  
  const examEndpoint = examDatabaseEndpoints[selectedExam];
  

  const handleAdd = (e) => {
    if (!selectedExam || !question || options.some(option => !option.text) || !answer) {
      setShowAlert(true);
      return;
    }
    
    
    
    e.preventDefault();
    // axios.post(examEndpoint,newQuestion).then((res)=>{
    //   console.log(res.data);
      addQuestionRequest(examEndpoint,newQuestion);

      setquestion({question: allquestions})
      setOptions(
        allquestions.options && allquestions.options.map((text, index) => ({
          id: index + 1,
          text,
        }))
      );

      setanswer(allquestions.answer);
      handleClearForm();
    // })
  
    
    setFormVisible(false);
  };showSnackbar('Question added successfully');
      

  
  
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  
  return (
  
    <div>
      <Dialog open={showAlert} onClose={() => setShowAlert(false)}>
        <DialogContent>
        <Button onClick={() => setShowAlert(false)} >Close</Button>
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="warning">
              <AlertTitle>Warning</AlertTitle>
              Please fill in all fields before submitting. <strong>Check it out!</strong>
            </Alert>
          </Stack>
          
        </DialogContent>
      </Dialog>
      <Snackbar
        open={showSuccessSnackbar}
        autoHideDuration={4000} // Adjust the duration as needed
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
      
    {!isFormVisible && (
      <div className='pull-left' >
      <Button sx={{marginTop:5,marginBottom:2}} color='inherit'  variant='contained'  type='button' onClick={() => setFormVisible(true)} endIcon={<CreateNewFolderOutlined/>}>Create</Button>
      </div>
    )}
    
    <TableContainer>
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
          Cancel
        </Button>
      </div>
      
      <div  className=' mb-n4'>
        
        <div className="text-center mt-4 mb-2">
        {isEditMode && (
          <h3>Edit Question</h3>
      )}
      {!isEditMode && (
        <h3 > Add Question</h3>
      )}
          </div><br/>
            <div>
        <TextField 
        variant='standard'
          fullWidth
          label="Question"
          id="fullwidth"
          focused
          required
          value={question}
          onChange={(e) => setquestion(e.target.value)}
          
        />
        {options.map((option, index) => (
        <div key={option.id}><br/>
        <TextField
          variant='standard'
          fullWidth
          id="fullwidth"
          label={`Option ${index + 1}`}
          focused
          required
          value={option.text}
          onChange={(e) => handleOptionChange(e, index)}
         
        />
        </div>
        ))}<br/>
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
        sx={{marginTop:3}}
        variant='contained'
        color='primary'
        type='button'
        // onClick={handleUpdate}
        className='btn btn-outline-primary ml-5 btn-lg'
        >
        Update
      </Button>
      </div>
    )}

      

    <div>
      <FormControl variant="standard" sx={{ marginTop:2,  minWidth: 120 }}>
        <InputLabel  id="demo-simple-select-standard-label">Select Exam</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={selectedExam}
          onChange={(e) => setSelectedExam(e.target.value)}
          label="Select Exam"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="react">React</MenuItem>
          <MenuItem value="python">Python</MenuItem>
          <MenuItem value="php">Php</MenuItem>
        </Select>
        </FormControl>
        </div>

        {!isEditMode && (
        <div className='pull-left mb-3'><br/>
        <Button variant='contained' color='secondary' type='button' onClick={handleAdd} className='btn btn-outline-success ml-5 btn-lg ' >Add</Button>
        </div>
        )}
        {!isEditMode && (
        <div className='text-right'>
        <Button sx={{marginTop:3}}  variant='contained' color='error' type='button' onClick={handleClearForm}  className='btn btn-outline-danger pull-right btn-lg ' >Clear</Button>
        </div> 
        )}    
      </div>
      </div>
      
      )}
      </Box>
      </DialogContent>
      </Dialog>
      </TableContainer>

      {/* <Popup show={showPopup} handleClose={handleClosePopup} /> */}
      
    
      </div>
  );
  
}
const mapStateToProps = (state) => ({
  allquestions: state.questionStore.allquestions,
  singlequestion: state.questionStore.questions
})
const mapDispatchToProps = (dispatch) => ({
  addQuestionRequest:(data,examEndpoint)=>dispatch(actions.addQuestions(data,examEndpoint)),
  getSinglequestionrequest:(id) => dispatch(actions.getSingleQuestion(id)),
  updatequestionrequest:(data) => dispatch(actions.updateQuestion(data)),
  initquestionrequest:(selectedValue) => dispatch(actions.getAllQuestions(selectedValue))


})

export default connect(mapStateToProps, mapDispatchToProps)  (Addform) ;
