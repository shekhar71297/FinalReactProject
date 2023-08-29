import React, { Component } from 'react'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import SelectExam from '../SelectExam';

const defaultTheme = createTheme();
export class Vouchervalidation extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Vcode: "",
            isSnackbarOpen: false,
            snackbarSeverity: '',
            snackbarMessage: '',
            isValid: false,

        }
    }
    inputChangeHandler = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }
    submitBtn = (e) => {
        e.preventDefault()
        axios.get("http://localhost:8888/vcodes").then((res) => {
            console.log(res.data);
            const istrue = res.data.some((d) =>
                this.state.Vcode === d.Vcode && d.status === true
            )
            console.log(istrue);
            if (istrue) {
                sessionStorage.setItem("Voucher", "true")
                this.setState({
                    isSnackbarOpen: true,
                    snackbarSeverity: 'success',
                    snackbarMessage: 'Valid voucher code',
                });

                setTimeout(() => {
                    this.setState({ snackbarOpen: false });
                    this.setState({ isValid: true });
                }, 1000);

            } else {
                this.setState({
                    isSnackbarOpen: true,
                    snackbarSeverity: 'error',
                    snackbarMessage: 'Enter valid voucher',
                });
            }
        })
    }
    render() {
        const { isSnackbarOpen, snackbarSeverity, snackbarMessage } = this.state;
        const { isValid } = this.state;
        return (

            <div>
                {isValid ? (
                    <SelectExam />
                ) : (
                    <>
                        <ThemeProvider theme={defaultTheme}>
                            <Container component="main" maxWidth="xs">
                                <CssBaseline />
                                <Box
                                    sx={{
                                        marginTop: 10,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        boxShadow: '0px 0px 7px black',
                                        borderRadius: "10px",
                                        border: 'none',

                                    }}
                                >

                                    <Box component="form" onSubmit={this.submitBtn} noValidate sx={{ mt: 1 }}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="code"
                                            // value={code}
                                            label="Enter Voucher code"
                                            name="Vcode"
                                            autoFocus
                                            onChange={this.inputChangeHandler}
                                        />
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                            onClick={this.submitBtn}  >
                                            submit
                                        </Button>

                                    </Box>
                                </Box>
                            </Container>
                        </ThemeProvider>
                        {/* Snackbar */}
                        <Snackbar
                            open={isSnackbarOpen}
                            autoHideDuration={3000} // You can adjust the duration as needed
                            onClose={() => this.setState({ isSnackbarOpen: false })}
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
                            <Alert onClose={() => this.setState({ isSnackbarOpen: false })} severity={snackbarSeverity} sx={{ width: '100%' }}>
                                {snackbarMessage}
                            </Alert>
                        </Snackbar>
                    </>
                )}
            </div>
        )
    }
}

export default Vouchervalidation
