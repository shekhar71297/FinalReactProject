import { Provider } from 'react-redux';
import './App.css';
import store from './store/store'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Result from './pages/result/container/Result';
// import Student from './pages/student/container/Student';
import StudentLogin from './component/student/StudentLogin';
import Student from './pages/student/container/Student';
import NewStudentRegistration from './component/student/NewStudentRegistration';
import { StudentDashboard } from './component/student/StudentDashboard';


function App() {
  return (
    <div className="App">
    
      <Provider  store={store}>
      
    
      <BrowserRouter>
    
      <Student/>
      {/* <StudentDashboard/> */}
      
      <Routes>
        <Route path='/register' element={<NewStudentRegistration/>}/>
        <Route path='/dash' element={<StudentDashboard />} />
         <Route path='/dashboard' element={<Dashboard />}>
          {/* <Route path='result' element={<Result/>}/> */}
        </Route> 
      </Routes>
      </BrowserRouter>
    </Provider>   
    </div>
  );
}

export default App;
