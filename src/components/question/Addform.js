import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import Popup from './Popup';
import { Modal } from 'react-bootstrap';

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

  const handleSignup = (e) => {
    setShowPopup(true);
    e.preventDefault();
    console.log('Add:', { Question, Option1, Option2, Option3, Option4, Answer});
    axios.post("http://localhost:8888/react",newQuestion).then((res)=>{
      console.log(res.data);
      setQuestion({question: res.data})
      
    })
    
    
  };
  const handleAddQuestion = () => {
    
    setFormVisible(false);
    
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  return (
    <div>


    {!isFormVisible && (
      <div className='float-start ms-5'>
      <button type='button' onClick={() => setFormVisible(true)}   className='btn btn-outline-dark  mt-5 ' >Add Question +</button>
      </div>
    )}
    
  
    <Container>
    <Modal show={isFormVisible} onHide={() => setFormVisible(false)}>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
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
      
      <div className=' mb-n4'>
        <div className="text-center mt-4 mb-2">
            <p className="h4"> Add Question</p>
          </div><br/>
        <TextField 
          fullWidth
          label="Question"
          id="fullwidth"
          value={Question}
          onChange={(e) => setQuestion(e.target.value)}
          
        />
        <div><br/>
        <TextField
         fullWidth
          id="fullwidth"
          label="Option1"
          value={Option1}
            onChange={(e) => setOption1(e.target.value)}
         
        />
        </div><br/>
        <div>
        <TextField
          fullWidth
          id="outlined-password-input"
          label="Option2"
          value={Option2}
            onChange={(e) => setOption2(e.target.value)}
        />
        </div><br/>
        <div>
        <TextField
          fullWidth
          id="outlined-password-input"
          label="Option3"
          value={Option3}
            onChange={(e) => setOption3(e.target.value)}
         
        />
        </div><br/>
        <div>
        <TextField
          fullWidth
          id="outlined-password-input"
          label="Option4"
          value={Option4}
          onChange={(e) => setOption4(e.target.value)}
         
        />
        </div><br/>
        <TextField
          fullWidth
          id="outlined-password-input"
          label="Answer"
          value={Answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        
        <div className='pull-left mb-3'><br/>
        <button type='button' onClick={handleSignup} className='btn btn-outline-success ml-5 btn-lg ' >Add</button>
        </div>
        <div className='text-right'>
        <button type='button' onClick={handleClearForm}  className='btn btn-outline-danger pull-right btn-lg' >Clear</button>
        </div> 
        <Popup show={showPopup} handleClose={handleClosePopup} />

        
        
        
        
      </div>
      )}
      
      </Box>
      </Modal.Body>
      </Modal>
      </Container>
      </div>
  );
}
 
export default Addform;
