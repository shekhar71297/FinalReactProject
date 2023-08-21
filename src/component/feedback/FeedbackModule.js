import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import * as validation from '../../util/validation';
import * as Action from '../../pages/feedback/Action';
import Typography from '@mui/material/Typography';


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
      isDetailsPopupOpen: false,
      selectedRecord: "",
      snackbarOpen: false,
      snackbarMessage: '',
      severity: '',
      errors: {
        fnameError: false,
        emailError: false,
        contactError: false,
        orgError: false,
        queOneError: false,
        queTwoError: false,
        queThreeError: false,
        queFourError: false,
        queFiveError: false,
        queSixError: false,
      },
      shouldRedirect: false,
    }
  }

  // New onChange event handler for text fields
  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value }, () => {
      if (name === "fname") {
        const isFnameError = !(validation.isValidFullName(this.state[name]));
        if (isFnameError) {
          this.setState({ errors: { ...this.state.errors, fnameError: true } })
        } else {
          this.setState({ errors: { ...this.state.errors, fnameError: false } })
        }
      }

      if (name === "org") {
        const isOrgError = !(validation.isValidFullName(this.state[name]));
        if (isOrgError) {
          this.setState({ errors: { ...this.state.errors, orgError: true } })
        } else {
          this.setState({ errors: { ...this.state.errors, orgError: false } })
        }
      }

      if (name === "email") {
        const isEmailError = !(validation.isValidEmail(this.state[name]));
        if (isEmailError) {
          this.setState({ errors: { ...this.state.errors, emailError: true } })
        } else {
          this.setState({ errors: { ...this.state.errors, emailError: false } })
        }
      }

      if (name === "contact") {
        const isContactError = !(validation.isValidContact(this.state[name]));
        if (isContactError) {
          this.setState({ errors: { ...this.state.errors, contactError: true } })
        } else {
          this.setState({ errors: { ...this.state.errors, contactError: false } })
        }
      }

      if (name === "queOne") {
        const isQueError = !(validation.isValidQue(this.state[name]));
        if (isQueError) {
          this.setState({ errors: { ...this.state.errors, queOneError: true } })
        } else {
          this.setState({ errors: { ...this.state.errors, queOneError: false } })
        }
      }

      if (name === "queTwo") {
        const isQueError = !(validation.isValidQue(this.state[name]));
        if (isQueError) {
          this.setState({ errors: { ...this.state.errors, queTwoError: true } })
        } else {
          this.setState({ errors: { ...this.state.errors, queTwoError: false } })
        }
      }

      if (name === "queThree") {
        const isQueError = !(validation.isValidQue(this.state[name]));
        if (isQueError) {
          this.setState({ errors: { ...this.state.errors, queThreeError: true } })
        } else {
          this.setState({ errors: { ...this.state.errors, queThreeError: false } })
        }
      }

      if (name === "queFour") {
        const isQueError = !(validation.isValidQue(this.state[name]));
        if (isQueError) {
          this.setState({ errors: { ...this.state.errors, queFiveError: true } })
        } else {
          this.setState({ errors: { ...this.state.errors, queFourError: false } })
        }
      }

      if (name === "queFive") {
        const isQueError = !(validation.isValidQue(this.state[name]));
        if (isQueError) {
          this.setState({ errors: { ...this.state.errors, queFiveError: true } })
        } else {
          this.setState({ errors: { ...this.state.errors, queFiveError: false } })
        }
      }

      if (name === "queSix") {
        const isQueError = !(validation.isValidQue(this.state[name]));
        if (isQueError) {
          this.setState({ errors: { ...this.state.errors, queSixError: true } })
        } else {
          this.setState({ errors: { ...this.state.errors, queSixError: false } })
        }
      }

    });
  };

  componentDidUpdate(prevProps, prevState) {
    
    if (this.state.shouldRedirect && this.state.shouldRedirect !== prevState.shouldRedirect) {
      window.location.href = '/';
    }
  }

  componentDidMount() {
    this.props.initFeedbackRequest()
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

    this.setState({
      snackbarOpen: true,
      snackbarMessage: "Thank You For Giving Feedback!!",
      severity: 'success',
    });

    setTimeout(()=>{
      this.setState({shouldRedirect: true});
    },2000)

    setTimeout(() => {
      this.setState({ snackbarOpen: false });
    }, 2000);
   
    this.resetForm();
  }


  render() {
    const { fname, contact, email, org, queOne, queTwo, queThree, queFour, queFive, queSix } = this.state;

    const isSubmitDisabled = !fname || !email || !contact || !org || !queOne || !queTwo || !queThree || !queFour || !queFive || !queSix;

    return (
      <div>
        <div style={{ marginTop: '80px' }}>
          <Card elevation={3} style={{ margin: 'auto', maxWidth: '800px', padding: '20px' }}>
            <CardHeader title={<Typography variant="h5" color="primary">Training Feedback</Typography>} />
            <CardContent>
              <form onSubmit={this.addfeedback}>
                <Box
                  sx={{
                    '& > :not(style)': { m: 1, width: '73ch' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField id="fullname" type='text' label='Name' name='fname' variant="standard"
                    required placeholder='Enter Name' multiline
                    rows={1} onChange={this.handleChange} value={fname} error={this.state.errors.fnameError} helperText={this.state.errors.fnameError && validation.errorText("Please enter a valid fullname")} />


                  <TextField id="email" type='email' name='email' label="Email" variant="standard"
                    required placeholder='Enter Email' multiline
                    rows={1} onChange={this.handleChange} value={email} error={this.state.errors.emailError} helperText={this.state.errors.emailError && validation.errorText("Please enter a valid email")}
                  />

                  <TextField id="contact" type='tel' name='contact' label="Contact" variant="standard"
                    required placeholder='Enter Contact' multiline
                    rows={1} onChange={this.handleChange} value={contact} error={this.state.errors.contactError} helperText={this.state.errors.contactError && validation.errorText("Please enter a valid contact")} />


                  <TextField id="organization" type='text' name='org' label="Organization" variant="standard"
                    required placeholder='Enter Organization' multiline
                    rows={1} onChange={this.handleChange} value={org} error={this.state.errors.orgError} helperText={this.state.errors.orgError && validation.errorText("Please enter a valid Organization")} />

                  <TextField
                    name="queOne"
                    type='text'
                    label="1. What did you enjoy the most about the trainning?"
                    variant="standard" required placeholder='Enter your comment here' multiline
                    rows={3} onChange={this.handleChange} value={queOne} error={this.state.errors.queOneError} helperText={this.state.errors.queOneError && validation.errorText("Please enter a valid answser")}
                  />

                  <TextField
                    name="queTwo"
                    type='text'
                    label="2. How would you rate the quality of instruction provided by the faculty?"
                    variant="standard" required placeholder='Enter your comment here' multiline
                    rows={3} onChange={this.handleChange} value={queTwo} error={this.state.errors.queTwoError} helperText={this.state.errors.queTwoError && validation.errorText("Please enter a valid answer")}
                  />

                  <TextField
                    name="queThree"
                    label="3. Was there any subject matter that you found confusing? If so, please provide specific examples."
                    variant="standard" required placeholder='Enter your comment here' multiline
                    rows={3} onChange={this.handleChange} value={queThree} error={this.state.errors.queThreeError} helperText={this.state.errors.queThreeError && validation.errorText("Please enter a valid answer")}
                  />

                  <TextField
                    name="queFour"
                    type='text'
                    label="4. What is the most valuable thing you learned in course (knowledge or skills)?"
                    variant="standard" required placeholder='Enter your comment here' multiline
                    rows={3} onChange={this.handleChange} value={queFour} error={this.state.errors.queFourError} helperText={this.state.errors.queFourError && validation.errorText("Please enter a valid answer")}
                  />

                  <TextField
                    name="queFive"
                    type='text'
                    label="5. Overall how is the faculty feedback? Any specific comments about faculty?"
                    variant="standard" required placeholder='Enter your comment here' multiline
                    rows={3} onChange={this.handleChange} value={queFive} error={this.state.errors.queFiveError} helperText={this.state.errors.queFiveError && validation.errorText("Please enter a valid answer")}
                  />

                  <TextField
                    name="queSix"
                    type='text'
                    label="6. Any additional comments you wish to share?"
                    variant="standard" required placeholder='Enter your comment here' multiline
                    rows={3} onChange={this.handleChange} value={queSix} error={this.state.errors.queSixError} helperText={this.state.errors.queSixError && validation.errorText("Please enter a valid answer")}
                  />

                  <Stack spacing={2} direction="row" style={{ margin: 'auto' }}>

                   
                    <Button type='submit' variant="contained" color="primary" disabled={isSubmitDisabled}>Submit</Button>

                    <Link to={'/'}>
                      <Button variant="contained" color="primary" >Back</Button>
                    </Link>
                  </Stack>
                </Box>
              </form>
            </CardContent>
          </Card>
          <Snackbar
            open={this.state.snackbarOpen}
            autoHideDuration={5000} // adjust the duration as needed
            onClose={() => this.setState({ snackbarOpen: false })}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert onClose={() => this.setState({ snackbarOpen: false })} severity={this.state.severity} sx={{ width: '100%' }}>
              {this.state.snackbarMessage}
            </Alert>
          </Snackbar>
        </div>
      </div >
    )
  }
}

const mapStateToProps = (state) => ({
  allFeedback: state.feedbackStore.allFeedback,
})
const mapDispatchToProps = (dispatch) => ({
  initFeedbackRequest: () => dispatch(Action.getAllFeedback()),
  addFeedbackRequest: (data) => dispatch(Action.addFeedBack(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(FeedbackModule)
