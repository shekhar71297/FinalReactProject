import { BrowserRouter,Routes, Route } from 'react-router-dom';
import './App.css';
import Student from './pages/student/container/Student';
import StudentRegistration from './component/student/StudentRegistration';
import NewStudentRegistration from './component/student/NewStudentRegistration'
import StudentDashboard from './component/student/StudentDashboard';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Student/>
    <NewStudentRegistration />
    <StudentDashboard/>
    <Routes>
      {/* <Route path='/register' element={<StudentRegistration/>}/> */}
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
