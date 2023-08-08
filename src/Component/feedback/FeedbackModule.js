import * as React from 'react';
import { Component } from 'react'
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Action from '../../pages/feedback/Action'

const ariaLabel = { 'aria-label': 'description' };

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
            queSix: '',
            // New state variables for storing error messages
            fnameError: '',
            emailError: '',
            contactError: '',
            orgError: '',
            queOneError: '',
            queTwoError: '',
            queThreeError: '',
            queFourError: '',
            queFiveError: '',
            queSixError: '',
        }
    }

    // New function for form validations
    validateForm = () => {
        const { fname, email, contact, org, queOne, queTwo, queThree, queFour, queFive, queSix } = this.state;
        let valid = true;
        const errors = {};

        //Validate 'fname' field (required)
        if (fname.trim() === ' ') {
            valid = false;
            errors.fnameError = 'Name is required.';
        } else {
            errors.fnameError = '';
        }

        // Validate 'email' field (required and email pattern)
        if (email.trim() === '') {
            valid = false;
            errors.emailError = 'Email is required.';
        } else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/i.test(email)) {
            valid = false;
            errors.emailError = 'Invalid email format.';
        } else {
            errors.emailError = '';
        }

        // Validate 'contact' field (required and numeric pattern)
        if (contact.trim() === '') {
            valid = false;
            errors.contactError = 'Contact is required.';
        } else if (!/^\d{10}$/.test(contact)) {
            valid = false;
            errors.contactError = 'Contact must be 10 digits.';
        } else {
            errors.contactError = '';
        }

        // Validate 'org' field (required)
        if (org.trim() === '') {
            valid = false;
            errors.orgError = 'Organization is required.';
        } else {
            errors.orgError = '';
        }

        // Validate 'queOne' field (required)
        if (queOne.trim() === '') {
            valid = false;
            errors.queOneError = 'This field is required.';
        } else {
            errors.queOneError = '';
        }

        // Validate 'queTwo' field (required)
        if (queTwo.trim() === '') {
            valid = false;
            errors.queTwoError = 'This field is required.';
        } else {
            errors.queTwoError = '';
        }

        // Validate 'queThree' field (required)
        if (queThree.trim() === '') {
            valid = false;
            errors.queThreeError = 'This field is required.';
        } else {
            errors.queThreeError = '';
        }

        // Validate 'queFour' field (required)
        if (queFour.trim() === '') {
            valid = false;
            errors.queFourError = 'This field is required.';
        } else {
            errors.queFourError = '';
        }

        // Validate 'queFive' field (required)
        if (queFive.trim() === '') {
            valid = false;
            errors.queFiveError = 'This field is required.';
        } else {
            errors.queFiveError = '';
        }

        // Validate 'queSix' field (required)
        if (queSix.trim() === '') {
            valid = false;
            errors.queSixError = 'This field is required.';
        } else {
            errors.queSixError = '';
        }

        // Update state with error messages
        this.setState(errors);

        return valid;
    };

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
        // const {name,value}=event.target;
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
        const { id, fname, contact, email, org, queOne, queTwo, queThree, queFour, queFive, queSix, fnameError, emailError, contactError, orgError, queOneError, queTwoError, queThreeError, queFourError, queFiveError, queSixError } = this.state;

        const isSubmitDisabled = !fname || !email || !contact || !org || !queOne || !queTwo || !queThree || !queFour || !queFive || !queSix || fnameError || emailError || contactError || orgError || queOneError || queTwoError || queThreeError || queFourError || queFiveError || queSixError;
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
                                rows={1} onChange={this.inputChangeHandler} value={fname} />
                            {fnameError && <span style={{ color: 'red' }}>{fnameError}</span>}

                            <TextField id="email" type='text' name='email' label="Email" variant="standard"
                                required placeholder='Enter Email' pattern='[a-z0-9._%+-]+@([a-z0-9.-]{5})+\.[a-z]{2,4}' multiline
                                rows={1} onChange={this.inputChangeHandler} value={email} />
                            {emailError && <span style={{ color: 'red' }}>{emailError}</span>}

                            <TextField id="contact" type='text' name='contact' label="Contact" variant="standard"
                                required placeholder='Enter Contact' pattern='[0-9]{10}' multiline
                                rows={1} onChange={this.inputChangeHandler} value={contact} />
                            {contactError && <span style={{ color: 'red' }}>{contactError}</span>}

                            <TextField id="organization" type='text' name='org' label="Organization" variant="standard"
                                required placeholder='Enter Organization' pattern='[a-zA-Z ]{2,30}' multiline
                                rows={1} onChange={this.inputChangeHandler} value={org} />
                            {orgError && <span style={{ color: 'red' }}>{orgError}</span>}

                            <TextField
                                name="queOne"
                                type='text'
                                label="1.What did you enjoy the most about the tranning?"
                                variant="standard" required placeholder='Enter your comment here' pattern='[a-zA-Z ]{2,300}' multiline
                                rows={3} onChange={this.inputChangeHandler} value={queOne}
                            />
                            {queOneError && <span style={{ color: 'red' }}>{queOneError}</span>}

                            {/* <Typography variant="h6" style={{ fontWeight: '600', fontSize: '16px', marginLeft: '290px' }}>
                                2. Please list 2-3 key learnings from course curriculum, and how you anticipate applying them to your work in the future.
                            </Typography> */}
                            <TextField
                                name="queTwo"
                                type='text'
                                label="2.How would you rate the quality of instruction provided by the faculty?"
                                variant="standard" required placeholder='Enter your comment here' pattern='[a-zA-Z ]{2,300}' multiline
                                rows={3} onChange={this.inputChangeHandler} value={queTwo}
                            />
                            {queTwoError && <span style={{ color: 'red' }}>{queTwoError}</span>}

                            {/* <Typography variant="h6" style={{ fontWeight: '600', fontSize: '16px', marginLeft: '290px' }}>
                            3. Was there any subject matter that you found confusing? If so, please provide specific examples.
                            </Typography> */}
                            <TextField
                                name="queThree"
                                label="3. Was there any subject matter that you found confusing? If so, please provide specific examples."
                                variant="standard" required placeholder='Enter your comment here' pattern='[a-zA-Z ]{2,300}' multiline
                                rows={3} onChange={this.inputChangeHandler} value={queThree}
                            />
                            {queThreeError && <span style={{ color: 'red' }}>{queThreeError}</span>}

                            {/* <Typography variant="h6" style={{ fontWeight: '600', fontSize: '16px', marginLeft: '185px' }}>
                            4. What is the most valuable thing you learned in course (knowledge or skills)?
                            </Typography> */}
                            <TextField
                                name="queFour"
                                type='text'
                                label="4. What is the most valuable thing you learned in course (knowledge or skills)?"
                                variant="standard" required placeholder='Enter your comment here' pattern='[a-zA-Z ]{2,300}' multiline
                                rows={3} onChange={this.inputChangeHandler} value={queFour}
                            />
                            {queFourError && <span style={{ color: 'red' }}>{queFourError}</span>}

                            {/* <Typography variant="h6" style={{ fontWeight: '600', fontSize: '16px', marginLeft: '185px' }}>
                                5. Overall how is the faculty feedback? Any specific comments about faculty?
                            </Typography> */}
                            <TextField
                                name="queFive"
                                type='text'
                                label="5. Overall how is the faculty feedback? Any specific comments about faculty?"
                                variant="standard" required placeholder='Enter your comment here' pattern='[a-zA-Z ]{2,300}' multiline
                                rows={3} onChange={this.inputChangeHandler} value={queFive}
                            />
                            {queFiveError && <span style={{ color: 'red' }}>{queFiveError}</span>}

                            {/* <Typography variant="h6" style={{ fontWeight: '600', fontSize: '16px', marginLeft: '185px' }}>
                            6. Any additional comments you wish to share?
                            </Typography> */}
                            <TextField
                                name="queSix"
                                type='text'
                                label="6. Any additional comments you wish to share?"
                                variant="standard" required placeholder='Enter your comment here' pattern='[a-zA-Z ]{2,300}' multiline
                                rows={3} onChange={this.inputChangeHandler} value={queSix}
                            />
                            {queSixError && <span style={{ color: 'red' }}>{queSixError}</span>}

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
const mapStateToProps = (state) => ({
    allFeedback: state.feedbackStore.allFeedback

})
const mapDispatchToProps = (dispatch) => ({
    initFeedbackRequest: () => dispatch(Action.getAllFeedback()),
    addFeedbackRequest: (data) => dispatch(Action.addFeedBack(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(FeedbackModule)