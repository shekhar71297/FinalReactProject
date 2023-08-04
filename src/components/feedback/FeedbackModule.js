import * as React from 'react';
import { Component } from 'react'
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import { TextareaAutosize } from '@mui/material';
import { Typography } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Action from '../../pages/feedback/Action'
import { Bolt } from '@mui/icons-material';


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
            queSix: ''
        }
    }

    componentDidMount() {
        this.props.initFeedbackRequest()
    }

    // componentDidUpdate(prevProps){
    //     if(prevProps.addFeedBack !== this.props.allFeedback){
    //         this.props.initFeedbackRequest()
    //     }
    // }

    // method update state property
    inputChangeHandler = (event) => {
        // const {name,value}=event.target;
        this.setState({ [event.target.name]: event.target.value })
    }

    //method to make post request
    addfeedback = (event) => {
        event.preventDefault();
        this.props.addFeedbackRequest(this.state)
        window.alert("Thank you...!,for giving feedback")

    }

    render() {
        const { id, fname, contact, email, org, queOne, queTwo, queThree, queFour, queFive, queSix } = this.state;
        const isSubmitDisabled = !fname || !email || !contact || !org || !queOne || !queTwo || !queThree || !queFour || !queFive || !queSix;
        return (
            <div>
                <div>
                    <h3>Training Feedback</h3><hr style={{ width: '73ch', margin: 'auto' }} />
                    <form onSubmit={this.addfeedback} action={<Link to=" " />}>
                        <Box
                            // component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '73ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            
                            <TextField id="fullname" type='text' label='Name' name='fname' variant="standard"
                                required placeholder='Enter Name' multiline
                                rows={1} onChange={this.inputChangeHandler} value={fname} />

                            <TextField id="email" type='text' name='email' label="Email" variant="standard"
                                required placeholder='Enter Email' pattern='[a-z0-9._%+-]+@([a-z0-9.-]{5})+\.[a-z]{2,4}' multiline
                                rows={1} onChange={this.inputChangeHandler} value={email} />

                            <TextField id="contact" type='text' name='contact' label="Contact" variant="standard"
                                required placeholder='Enter Contact' pattern='[0-9]{10}' multiline
                                rows={1} onChange={this.inputChangeHandler} value={contact} />


                            <TextField id="organization" type='text' name='org' label="Organization" variant="standard"
                                required placeholder='Enter Organization' pattern='[a-zA-Z ]{2,30}' multiline
                                rows={1} onChange={this.inputChangeHandler} value={org} />


                            <TextField
                                name="queOne"
                                type='text'
                                label="1.What did you enjoy the most about the tranning?"
                                variant="standard" required placeholder='Enter your comment here' pattern='[a-zA-Z ]{2,300}' multiline
                                rows={2} onChange={this.inputChangeHandler} value={queOne}
                            />

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

                            {/* <Typography variant="h6" style={{ fontWeight: '600', fontSize: '16px', marginLeft: '290px' }}>
                            3. Was there any subject matter that you found confusing? If so, please provide specific examples.
                            </Typography> */}
                            <TextField
                                name="queThree"
                                label="3. Was there any subject matter that you found confusing? If so, please provide specific examples."
                                variant="standard" required placeholder='Enter your comment here' pattern='[a-zA-Z ]{2,300}' multiline
                                rows={3} onChange={this.inputChangeHandler} value={queThree}
                            />
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