import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Popup from './Popup';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import axios from 'axios';
import { Button, TableContainer } from '@mui/material';
import { CreateNewFolderOutlined } from '@mui/icons-material';




const Addform = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [Question, setQuestion] = useState('');
  const [Option1, setOption1] = useState('');
  const [Option2, setOption2] = useState('');
  const [Option3, setOption3] = useState('');
  const [Option4, setOption4] = useState('');
  const [Answer, setAnswer] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [showPopup, setShowPopup] = useState(false);

  

  const handleClearForm = () => {

    setQuestion('');
    setOption1('');
    setOption2('');
    setOption3('');
    setOption4('');
    setAnswer('');
  };
  const newQuestion = {
    Question,
    Option1,
    Option2,
    Option3,
    Option4,
    Answer,
  };

  const handleAdd = (e) => {
    
    setShowPopup(true);
    e.preventDefault();
    axios.post("http://localhost:8888/react",newQuestion).then((res)=>{
      console.log(res.data);
      setQuestion({question: res.data})
      
    })
    
    setFormVisible(false);
  };
  
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  return (
    
    <div>
      
    {!isFormVisible && (
      <div  >
      <Button sx={{marginTop:5}}  variant='contained'  type='button' onClick={() => setFormVisible(true)} endIcon={<CreateNewFolderOutlined/>}>Create</Button>
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
      
      <div  className=' mb-n4'>
        <div className="text-center mt-4 mb-2">
            <h3> Add Question</h3>
          </div><br/>
        <TextField 
        variant='standard'
          fullWidth
          label="Question"
          id="fullwidth"
          focused
          value={Question}
          onChange={(e) => setQuestion(e.target.value)}
          
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
          value={Answer}
          focused
          onChange={(e) => setAnswer(e.target.value)}
        />
        
        <div className='pull-left mb-3'><br/>
        <Button variant='outlined' color='secondary' type='button' onClick={handleAdd} className='btn btn-outline-success ml-5 btn-lg ' >Add</Button>
        </div>
        <div className='text-right'>
        <Button sx={{marginTop:3}} variant='outlined' color='error' type='button' onClick={handleClearForm}  className='btn btn-outline-danger pull-right btn-lg mt-5' >Clear</Button>
        </div> 
        
        <Popup show={showPopup} handleClose={handleClosePopup} />
      </div>
      
      )}
      </Box>
      </DialogContent>
      </Dialog>
      </TableContainer>
      
      </div>
      
  );
}

export default  Addform;
