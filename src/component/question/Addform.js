import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Popup from './Popup';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import axios from 'axios';
import { Button, TableContainer } from '@mui/material';
import { Cancel, CreateNewFolderOutlined } from '@mui/icons-material';
import { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

const Addform = ({ isEditMode, editQuestionData, setEditMode, setEditQuestionData }) => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [question, setquestion] = useState('');
  const [options, setOptions] = useState([
    { id: 1, text: '' },
    { id: 2, text: '' },
    { id: 3, text: '' },
    { id: 4, text: '' },
  ]);
  
  const [answer, setanswer] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleOptionChange = (e, optionIndex) => {
    const newText = e.target.value;
    setOptions((prevOptions) =>
      prevOptions.map((option, index) =>
        index === optionIndex ? { ...option, text: newText } : option
      )
    );
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
  };
  
  

  const handleAdd = (e) => {
    if (!question || options.some(option => !option.text) || !answer) {
      setShowAlert(true);
      return;
    }

    setShowPopup(true);
    e.preventDefault();
    axios.post("http://localhost:8888/react",newQuestion).then((res)=>{
      console.log(res.data);
      setquestion({question: res.data})
      setOptions(
        res.data.options.map((text, index) => ({
          id: index + 1,
          text,
        }))
      );
      setanswer(res.data.answer);
      handleClearForm();
    })
    .catch((error) => {
      console.error(error);
    });
    
    setFormVisible(false);
  };
  
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
            <h3 > Add Question</h3>
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

      <Popup show={showPopup} handleClose={handleClosePopup} />
      
    
      </div>
  );
  
}

export default  Addform;
