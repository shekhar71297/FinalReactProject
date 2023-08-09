import React, { useState } from 'react';
import axios from 'axios';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';




const Questiontable = () => {
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState({});
  const [collapsedItemId, setCollapsedItemId] = useState(null)
  const handleCollapseToggle = (itemId) => {
    setSelectedOption((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId]
    }));
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
        })
        .catch((error) => {
          // console.error(error);
        });
    } else {
      setData([]);
    };
  }
  return (

    <div className='question'>
      <select  onChange={handleDropdownChange}>
        <option >Select Exam</option>
        <option value="react">React</option>
        <option value="python">python</option>
        <option value="Php">Php</option>
      </select>
      <div>


        <Box marginRight={10}>


          <TableContainer component={Paper}  >
            <Table stickyHeader aria-label="sticky table"  >
              <TableHead style={{ backgroundColor: '#2962ff', fontSize: 30 }} color="primary-color"  >
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
                          ))}
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


        </Box>

      </div>
    </div>
  );
};
export default Questiontable;