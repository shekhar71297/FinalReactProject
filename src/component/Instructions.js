import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import StartExam from './StartExam';
import { useState } from 'react';

export default function Instructions() {
    const [showQuiz, setShowQuiz] = React.useState(false);

    const handleStartClick = () => {
        setShowQuiz(true);
      };
  return (
    <div>
        {showQuiz ? (
        <StartExam />
      ) : (
        <>
         <Card sx={{ maxWidth: 345,margin:"auto",marginTop:20 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
       Instructions
        </Typography>
        <Typography align='left' variant="body2" color="text.secondary">
            <ul>
                <h4>Follow the Below Instruction</h4>
                <li>Do not refresh the page</li>
                <li>Do not use keyboard</li>
                <li>Exam will be automatically submit after time is over</li>
                <li>Do not open another tab </li>
            </ul>
        </Typography>
      </CardContent>
      <CardActions sx={{marginLeft:15}}>
        <Button variant='contained' color='primary' onClick={handleStartClick}>Start</Button>
      </CardActions>
    </Card>
    </>
      )}
    </div>
   
  );
}