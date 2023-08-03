import { BrowserRouter,Routes, Route } from 'react-router-dom';
import './App.css';
import Student from './pages/student/container/Student';
import NewStudentRegistration from './component/student/NewStudentRegistration'
import StudentDashboard from './component/student/StudentDashboard';
import NavBar from './component/student/NavBar';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    {/* <Student/> */}
    
    <Routes>
      <Route path='/' element={<NavBar/>}/>
      <Route path='Register' element={<NewStudentRegistration />}/>
    </Routes>
    <NewStudentRegistration/>
    <StudentDashboard/>
    </BrowserRouter>
    </div>
  );
}

export default App;
