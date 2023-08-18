import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {IoIosCheckmarkCircle } from 'react-icons/io';

export default function SubmitExam() {
  return (
        <>
         <Card sx={{ maxWidth: 345,margin:"auto",marginTop:10,borderRadius:10, boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)' }}>
      <CardContent>
        <Typography gutterBottom variant="h4" color="primary" component="div">
        Exam Submitted Successfully
        </Typography>
        <Typography align='center' variant="h1" color="primary">
          
           <IoIosCheckmarkCircle/>
        </Typography>
      </CardContent>
    </Card>
    </>
  );
}