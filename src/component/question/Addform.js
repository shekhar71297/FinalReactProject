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




const Addform = ({ isEditMode, editQuestionData }) => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [question, setquestion] = useState('');
  const [Option1, setOption1] = useState('');
  const [Option2, setOption2] = useState('');
  const [Option3, setOption3] = useState('');
  const [Option4, setOption4] = useState('');
  const [answer, setanswer] = useState('');
  const [showPopup, setShowPopup] = useState(false);


  useEffect(() => {
    if (isEditMode) {
      setquestion(editQuestionData.question);
      setOption1(editQuestionData.Option1);
      setOption2(editQuestionData.Option2);
      setOption3(editQuestionData.Option3);
      setOption4(editQuestionData.Option4);
      setanswer(editQuestionData.answer);
    }
  }, [isEditMode, editQuestionData]);


  const handleClearForm = () => {

    setquestion('');
    setOption1('');
    setOption2('');
    setOption3('');
    setOption4('');
    setanswer('');
  };
  const newQuestion = {
    question,
    Option1,
    Option2,
    Option3,
    Option4,
    answer,
  };
  

  const handleAdd = (e) => {
    setShowPopup(true);
    e.preventDefault();
    axios.post("http://localhost:8888/react",newQuestion).then((res)=>{
      console.log(res.data);
      setquestion({question: res.data})
      handleClearForm();
    })
    
    setFormVisible(false);
  };
  
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  return (
    
    <div>
      
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
          value={question}
          onChange={(e) => setquestion(e.target.value)}
          
        />
        <div><br/>
        <TextField
          variant='standard'
          fullWidth
          id="fullwidth"
          label="Option1"
          focused
          value={Option1}
          onChange={(e) => setOption1(e.target.value)}
         
        />
        </div><br/>
        <div>
        <TextField
          variant='standard'
          fullWidth
          id="outlined-password-input"
          label="Option2"
          value={Option2}
          focused
          onChange={(e) => setOption2(e.target.value)}
        />
        </div><br/>
        <div>
        <TextField
          variant='standard'
          fullWidth
          id="outlined-password-input"
          label="Option3"
          focused
          value={Option3}
          onChange={(e) => setOption3(e.target.value)}
         
        />
        </div><br/>
        <div>
        <TextField
          variant='standard'
          fullWidth
          id="outlined-password-input"
          label="Option4"
          value={Option4}
          focused
          onChange={(e) => setOption4(e.target.value)}
         
        />
        </div><br/>
        <TextField
          variant='standard'
          fullWidth
          id="outlined-password-input"
          label="Answer"
          value={answer}
          focused
          onChange={(e) => setanswer(e.target.value)}
        />
        </div>
    
        <div className='pull-left mb-3'><br/>
        <Button variant='contained' color='secondary' type='button' onClick={handleAdd} className='btn btn-outline-success ml-5 btn-lg ' >Add</Button>
        </div>
        <div className='text-right'>
        <Button sx={{marginTop:3}} variant='contained' color='error' type='button' onClick={handleClearForm}  className='btn btn-outline-danger pull-right btn-lg mt-5' >Clear</Button>
        </div>      
        
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
