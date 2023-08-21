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




const Questiontable = ({ allquestions }) => {
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState({});
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [showCreateButton, setShowCreateButton] = useState(false);

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
    setSelectedOption(event.target.value)
    const selectedValue = event.target.value;


    if (selectedValue) {
      axios
        .get(`http://localhost:8888/${selectedValue}`)
        .then((response) => {
          // console.log(response.data)
          setData(response.data);
          setShowCreateButton(true); // Show the "Create" button

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
          value={data}
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
          <Addform />
        )}


        <Box marginRight={10}>
          <TableContainer component={Paper}  >
            <Table stickyHeader aria-label="sticky table"  >
              <TableHead style={{ backgroundColor: '#2962ff', fontSize: 30, height: 60 }}   >
                Questions
              </TableHead>
              <TableBody color='primary-color'>

                {data.map((item) => (
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
                          <Grid marginLeft={90} item xs={4}>
                            <Button><DeleteOutlineSharp sx={{ color: dark[500] }} /></Button>
                            <Button><EditNoteSharp sx={{ color: dark[500] }} /></Button>
                          </Grid>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
                <TableRow>
                  <TableCell height='100px' align='center' >NO DATA</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

        </Box>
      </div>
    </div>
  );
};
export default Questiontable;