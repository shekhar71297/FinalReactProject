<<<<<<< HEAD
import { BrowserRouter,Routes,Route } from 'react-router-dom';
=======
import { BrowserRouter,Routes, Route } from 'react-router-dom';
>>>>>>> f43f2f7e8a3d628aeb58c0ccd931530278e6a0cc
import './App.css';
import Sidenav from './pages/Sidenav';
import Sidenavbar from './pages/Sidenavbar';

import Student from './pages/student/container/Student';
<<<<<<< HEAD
import User from './pages/user/container/User'
 
import Login from './component/user/Login';
import Sidenav from './pages/Sidenav';
import store from './store/store'
import { Provider } from 'react-redux';

 
=======
import NewStudentRegistration from './component/student/NewStudentRegistration'
import StudentDashboard from './component/student/StudentDashboard';
import NavBar from './component/student/NavBar';
>>>>>>> f43f2f7e8a3d628aeb58c0ccd931530278e6a0cc

function App() {
  return (
    <div className="App">
<<<<<<< HEAD

      <Provider store={store}>
      
      <BrowserRouter>
    {/* <Student/> */}
    <Routes>

      <Route path="/" element={<Login/>}/>
     <Route path="user" element={<User/>}/>
     <Route path='dashboard'element={<Sidenav/>}/>
     
    </Routes>
     
    </BrowserRouter>
    </Provider>
=======
    <BrowserRouter>
    {/* <Student/> */}
    
    <Routes>
      <Route path='/' element={<NavBar/>}/>
      <Route path='Register' element={<NewStudentRegistration />}/>
    </Routes>
    <NewStudentRegistration/>
    <StudentDashboard/>
    </BrowserRouter>
    {/* <Student /> */}
   
>>>>>>> f43f2f7e8a3d628aeb58c0ccd931530278e6a0cc
    </div>
  );
}

export default App;
