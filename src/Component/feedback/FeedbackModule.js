import * as React from 'react';
import { Component } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export class FeedbackModule extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: null,
            fname: '',
            email: '',
            contact: '',
            org: '',
            queOne: '',
            queTwo: '',
            queThree: '',
            queFour: '',
            queFive: '',
            queSix: ''
        }
    }

    // New onChange event handler for text fields
    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        });
    };

    componentDidMount() {
        this.props.initFeedbackRequest()
    }

    // method update state property
    inputChangeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    // Method to reset the form
    resetForm = () => {
        this.setState({
            id: null,
            fname: '',
            email: '',
            contact: '',
            org: '',
            queOne: '',
            queTwo: '',
            queThree: '',
            queFour: '',
            queFive: '',
            queSix: ''
        });
    };

    //method to make post request
    addfeedback = (event) => {
        event.preventDefault();
        const payload = {
            fname: this.state.fname,
            email: this.state.email,
            contact: this.state.contact,
            org: this.state.org,
            queOne: this.state.queOne,
            queTwo: this.state.queTwo,
            queThree: this.state.queThree,
            queFour: this.state.queFour,
            queFive: this.state.queFour,
            queSix: this.state.queSix
        }
        
        this.props.addFeedbackRequest(payload)
        window.alert("Thank you...!,for giving feedback")
        this.resetForm();
    }

    render() {
        const { fname, contact, email, org, queOne, queTwo, queThree, queFour, queFive, queSix,errorMessage } = this.state;

        const isSubmitDisabled = !fname || !email || !contact || !org || !queOne || !queTwo || !queThree || !queFour || !queFive || !queSix ;
        return (
            <div>
                <div style={{marginTop:'80px'}}>
                    <h4>Training Feedback</h4><hr style={{ width: '73ch', margin: 'auto' }} />
                    <form onSubmit={this.addfeedback} action={<Link to=" " />}>
                        <Box
                            sx={{
                                '& > :not(style)': { m: 1, width: '73ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField id="fullname" type='text' label='Name' name='fname' variant="standard"
                                required placeholder='Enter Name' multiline
                                rows={1} onChange={this.inputChangeHandler} value={fname} errorMessage="Full name is required"/>

                            <TextField id="email" type='email' name='email' label="Email" variant="standard"
                                required placeholder='Enter Email' pattern='[a-z0-9._%+-]+@([a-z0-9.-]{5})+\.[a-z]{2,4}' multiline
                                rows={1} onChange={this.inputChangeHandler} value={email}
                            />
                            
                            <TextField id="contact" type='tel' name='contact' label="Contact" variant="standard"
                                required placeholder='Enter Contact' pattern='[0-9]{10}' multiline
                                rows={1} onChange={this.inputChangeHandler} value={contact} />
                            
                            <TextField id="organization" type='text' name='org' label="Organization" variant="standard"
                                required placeholder='Enter Organization' pattern='[a-zA-Z ]{2,30}' multiline
                                rows={1} onChange={this.inputChangeHandler} value={org} />

                            <TextField
                                name="queOne"
                                type='text'
                                label="1.What did you enjoy the most about the trainning?"
                                variant="standard" required placeholder='Enter your comment here' pattern='[a-zA-Z ]{2,300}' multiline
                                rows={3} onChange={this.inputChangeHandler} value={queOne}
                            />

                            <TextField
                                name="queTwo"
                                type='text'
                                label="2.How would you rate the quality of instruction provided by the faculty?"
                                variant="standard" required placeholder='Enter your comment here' pattern='[a-zA-Z ]{2,300}' multiline
                                rows={3} onChange={this.inputChangeHandler} value={queTwo}
                            />

                            <TextField
                                name="queThree"
                                label="3. Was there any subject matter that you found confusing? If so, please provide specific examples."
                                variant="standard" required placeholder='Enter your comment here' pattern='[a-zA-Z ]{2,300}' multiline
                                rows={3} onChange={this.inputChangeHandler} value={queThree}
                            />
                            
                            <TextField
                                name="queFour"
                                type='text'
                                label="4. What is the most valuable thing you learned in course (knowledge or skills)?"
                                variant="standard" required placeholder='Enter your comment here' pattern='[a-zA-Z ]{2,300}' multiline
                                rows={3} onChange={this.inputChangeHandler} value={queFour}
                            />

                            <TextField
                                name="queFive"
                                type='text'
                                label="5. Overall how is the faculty feedback? Any specific comments about faculty?"
                                variant="standard" required placeholder='Enter your comment here' pattern='[a-zA-Z ]{2,300}' multiline
                                rows={3} onChange={this.inputChangeHandler} value={queFive}
                            />

                            <TextField
                                name="queSix"
                                type='text'
                                label="6. Any additional comments you wish to share?"
                                variant="standard" required placeholder='Enter your comment here' pattern='[a-zA-Z ]{2,300}' multiline
                                rows={3} onChange={this.inputChangeHandler} value={queSix}
                            />
                            
                            <Stack spacing={2} direction="row" style={{ margin: 'auto' }}>
                                <Button type='submit' variant="contained" color="primary" disabled={isSubmitDisabled}>Submit</Button>
                                <Link to={'/login'}><Button variant="contained" color="primary" >Back</Button></Link>
                            </Stack>
                        </Box>
                    </form>
                </div>
            </div>
        )
    }
}

export default FeedbackModule;