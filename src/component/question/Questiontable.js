import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import TablePagination from '@mui/material/TablePagination';
import { DeleteOutlineSharp, EditNoteSharp } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import { dark } from '@mui/material/styles/createPalette';
import Addform from './Addform';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import * as TablePaginationActions from "../common/TablePaginationActions";


const Questiontable = ({ allquestions }) => {
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState({});
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [showCreateButton, setShowCreateButton] = useState(false); 
  const [selectedItemForDeletion, setSelectedItemForDeletion] = useState(null); // New state for selected item
  const [isEditMode, setEditMode] = useState(false);
  const [editQuestionData, setEditQuestionData] = useState({});
  const [selectedValue, setSelectedValue] = useState('');



  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const handleEdit = (itemId) => {
    // Find the question data based on itemId
    const questionToEdit = data.find(item => item.id === itemId);
    setEditQuestionData(questionToEdit);
    setEditMode(true);
    // setUpdatedQuestionData(questionToEdit);
  };
  
  const handleDelete = (itemId) => {
    setSelectedItemForDeletion(itemId); // Set the selected item for deletion
  };
  

  useEffect(() => {
    const data = allquestions && allquestions.length > 0 ? allquestions : [];
    setData(data);
  },[]);

  useEffect(() => {
    const data = allquestions && allquestions.length > 0 ? allquestions : [];
    setData(data);
    
  },[allquestions])


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

  const handleRadioChange = (questionId, option) => {
    setSelectedOption((prevState) => ({
      ...prevState,
      [questionId]: option
    }));
  };

  const handleDropdownChange = (event) => {
    setSelectedOption({})
    const selectedValue = event.target.value;
    setSelectedValue(selectedValue);
    


    if (selectedValue) {
      axios
        .get(`http://localhost:8888/${selectedValue}`)
        .then((response) => {
          setData(response.data);
          setShowCreateButton(true); 
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setData([]);
      setShowCreateButton(false); // Hide the "Create" button

    };
  }

  return (

    <div className='question'>
      <FormControl variant="standard" sx={{ m: 3, marginLeft: 70, minWidth: 160 }}>
        <InputLabel id="demo-simple-select-standard-label">Select Exam</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={selectedValue}
          onChange={handleDropdownChange}
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
      <div>
        {showCreateButton && (
        <Addform/>
        )}
      
        {isEditMode && (
        <Addform
          isEditMode={isEditMode}
          editQuestionData={editQuestionData}
          setEditMode={setEditMode}
          setEditQuestionData={setEditQuestionData}
        />
      )}
        <Box marginRight={10}>
          <TableContainer component={Paper}  >
            <Table stickyHeader aria-label="sticky table"  >
              <TableHead   sx={{color:'white', backgroundColor: '#1976d2', fontSize: 40,height:60 }}   >
                Questions
              </TableHead>
              <TableBody color='secondary-color'>
              {data.length > 0 ? (
                data.slice(startIndex, endIndex).map((item) => (
                  <React.Fragment key={item.id}>
                    <TableRow hover onClick={() => handleCollapseToggle(item.id)} >
                      <TableCell >{item.question}</TableCell>
                    </TableRow >
                    {selectedOption[item.id] && (
                      <TableRow >
                        <TableCell height={2}>
                          {item.options.map((option) => (
                            <div key={option}>
                              <input
                                type="radio"
                                name={`radio-${item.id}`}
                                value={option}
                                checked={selectedOption[item.id] === option}
                                onChange={() => handleRadioChange(item.id, option)}
                              />
                              <label>{option}</label>
                            </div>
                          ))}<br></br>
                          Answer :  {item.answer}
                          <div>
                          <Grid  marginLeft={100} item xs={4}>
                           <Button onClick={() => handleDelete(item.id)}>
                            <DeleteOutlineSharp   sx={{ color: dark[500] }} /></Button>
                           <Button onClick={() => { setEditMode(true); setEditQuestionData(item); }}>
                            <EditNoteSharp sx={{ color: dark[500] }}/></Button>
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
              count={data.length}
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
      </div>     
      <Dialog open={selectedItemForDeletion !== null} onClose={() => setSelectedItemForDeletion(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
        {selectedItemForDeletion && (
          <div>
          Are you sure you want to delete the following question?
          <div>{data.find(item => item.id === selectedItemForDeletion)?.question}</div>
          </div>
        )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedItemForDeletion(null)}>Cancel</Button>
          <Button  color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default Questiontable;