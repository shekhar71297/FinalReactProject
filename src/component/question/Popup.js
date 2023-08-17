import React from 'react';
import Dialog  from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { CloseSharp } from '@mui/icons-material';
import { Alert } from '@mui/material';


const Popup = ({ show, handleClose }) => {
  return (
    <Dialog open={show} onClose={handleClose} aria-labelledby="dialog-title">
      <DialogTitle id="dialog-title">Success</DialogTitle>
      <DialogActions>
        <Button endIcon={<CloseSharp/>} onClick={handleClose} color="primary">
        </Button>
      </DialogActions>
      <DialogContent >
      <Alert variant="filled" severity="success">
       The question has been successfully added!
      </Alert>
      </DialogContent>
      
    </Dialog>
  );
};

export default Popup;
