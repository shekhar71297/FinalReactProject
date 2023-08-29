import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export const isValidFullName = (name) => /^[a-zA-Z ]{2,40}$/.test(name);
export const isValidQue = (que) => /^[a-zA-Z0-9., ]{5,100}$/.test(que);
export const isValidName = (name) => /^[a-zA-Z]{2,10}$/.test(name);
export const isValidContact = (contact) => /^[6789]\d{9}$/.test(contact);
export const isValidEmail=(email)=>/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}$/.test(email);
export const isValidPassword=(Password)=>/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(Password);
export const isValidexamcode =(examcode)=> /^[a-zA-Z0-9]+\-+[a-zA-Z0-9\- ]{1,9}$/.test(examcode);
export const errorText = (message) => {
    return (<span style={{'display':'flex','alignItems':'center'}}>
      <ErrorOutlineIcon /> <span style={{'paddingLeft':'5px'}}>{message}</span>
    </span>)
  }
  
