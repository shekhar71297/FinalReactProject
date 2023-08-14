import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import StudentLogin from './StudentLogin';

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{textAlign:'left',fontWeight:'bold',width:'100px'}}>
            Hematite Infotech Online-Quiz
          </Typography>
        </Toolbar>
      </AppBar>
        <StudentLogin/>
        
      <Box sx={{ flexGrow: 1 , marginTop:18}}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{textAlign:'right',fontWeight:'bold',width:'100px',fontSize:'15px'}}>
            Designed And Developed By  Sujit Gaikwad
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>

    </Box>
    
  );
}