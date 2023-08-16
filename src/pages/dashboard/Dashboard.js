
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { FaUsers } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { PiExamFill, PiStudentFill } from 'react-icons/pi';
import { MdGeneratingTokens } from 'react-icons/md';
import { GiPapers } from 'react-icons/gi';
import { MdFeedback } from 'react-icons/md';
import { RiNewspaperFill } from 'react-icons/ri';
import { IoMdLogOut } from 'react-icons/io';
import { Outlet, useNavigate } from 'react-router-dom';
import './dashboard.css'
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const Dashboard = () => {

  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();



  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navigatePage = (path) => {
    navigate(path)
  }



  const isAdminLog = !!sessionStorage.getItem("Admin");

  const isTrainerLog = !!sessionStorage.getItem("Trainer");

  const handleLogout = () => {
    if (isAdminLog) {
      sessionStorage.removeItem("Admin")
      window.alert("logout successfully")
      // navigate('/')
    } else if (isTrainerLog)
      sessionStorage.removeItem("Trainer")
    window.alert("logout successfully")
    // navigate('/')
  };


  return (

    <>

      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setOpen(!open)}
              edge="start"

            >
              <GiHamburgerMenu />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Dashboard
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton
              color="inherit"
              aria-label="logout"
              onClick={handleLogout}
              edge="end"
            >
              <IoMdLogOut />
            </IconButton>
          </Toolbar>
        </AppBar>


        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />

          <List>
            {/* User module               */}
            {isAdminLog && (
              <ListItem disablePadding sx={{ display: 'block' }} >
                <ListItemButton onClick={() => navigatePage("/dashboard/user")}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >

                    <FaUsers />
                  </ListItemIcon>
                  <ListItemText primary='User' sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            )}
            {/* Student module */}
            <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigatePage("/dashboard/student")} >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <PiStudentFill />
                </ListItemIcon>
                <ListItemText primary='Student' sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            {/* Exam Module */}
            <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigatePage("/dashboard/exam")} >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <RiNewspaperFill />
                </ListItemIcon>
                <ListItemText primary='Exam' sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>

            {/* Question Module */}
            <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigatePage("/dashboard/question")} >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  < GiPapers />
                </ListItemIcon>
                <ListItemText primary='Question' sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            {/* Voucher module */}
            <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigatePage("/dashboard/voucher")}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <MdGeneratingTokens />
                </ListItemIcon>
                <ListItemText primary='Voucher' sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            {/* Feedback module */}
            <ListItem disablePadding sx={{ display: 'block' }} onClick={(e) => navigatePage("/dashboard/feedback")} >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <MdFeedback />
                </ListItemIcon>
                <ListItemText primary='Feedback' sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ display: 'block' }} onClick={(e) => navigatePage("/dashboard/result")} >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <PiExamFill />
                </ListItemIcon>
                <ListItemText primary='Result' sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>

          </List>
          <Divider />

        </Drawer>
        <div className='child-components'>
          <Outlet />
        </div>
      </Box>
    </>
  );
}

export default Dashboard
