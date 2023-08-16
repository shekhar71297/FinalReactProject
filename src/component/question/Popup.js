import React from 'react';
import Dialog  from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';


const Popup = ({ show, handleClose }) => {
  return (
    <Dialog open={show} onClose={handleClose} aria-labelledby="dialog-title">
      <DialogTitle id="dialog-title">Success</DialogTitle>
      <DialogContent>
        <p>The question has been successfully added!</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Popup;
