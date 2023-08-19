import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export const isValidContact = (contact) => /^[6789]\d{9}$/.test(contact);
export const isValidPassword=(Password)=>/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(Password);
export const isValidName = (name) => /^[a-zA-Z ]{5,20}$/.test(name);
export const isValidEmail = (email) => /^[a-z0-9._%+-]+@([a-z0-9.-]{5})+\.[a-z]{2,4}$/.test(email);
export const isValidQue = (que) => /^[a-zA-Z0-9 ]{5,100}$/.test(que);

export const errorText = (message) => {
    return (<span style={{'display':'flex','alignItems':'center'}}>
      <ErrorOutlineIcon /> <span style={{'paddingLeft':'5px'}}>{message}</span>
    </span>)
  }
