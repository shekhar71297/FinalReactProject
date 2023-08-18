import React, { Component } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Instructions from './Instructions';

class SelectExam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exam: '',
            showInstruction:false,
        };
    }

    handleChange = (event) => {
        this.setState({
            exam: event.target.value,
            
        });
    };

    submitBtn = ()=>{
        this.setState({showInstruction:true})
        console.log(this.state.exam);
    }

    render() {
        const { exam } = this.state;
        const { showInstruction } = this.state

        return (
            <div>
            {showInstruction ? (
                <Instructions />
              ) : (
                <>
            <Box sx={{
                margin: "auto",
                marginTop: 10,
                display: 'flex',
                width: "700px",
                height: "300px",
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '0px 0px 7px black',
                borderRadius: "10px",
                border: 'none',
            }}>
                <Box sx={{
                    width: "400px",
                    margin: "auto",
                    marginTop: 10,
                }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={exam}
                            label="Exam"
                            name='exam'
                            onChange={this.handleChange}
                        >
                            <MenuItem value="ReactJs">ReactJs</MenuItem>
                            <MenuItem value="Php">Php</MenuItem>
                            <MenuItem value="Python">Python</MenuItem>
                        </Select>
                    </FormControl>
                   
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={this.submitBtn}
                        >
                            submit
                        </Button>
                   
                </Box>
            </Box>
            </>
              )}
            </div>
        );
    }
}

export default SelectExam;
