import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.css';
import Student from './pages/student/container/Student';
import StudentRegistration from './component/student/StudentRegistration';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Student/>} />
        <Route path='register' element={<StudentRegistration/>} />
        
        </Routes>
        </BrowserRouter>
    
    </div>
  );
}

export default App;
