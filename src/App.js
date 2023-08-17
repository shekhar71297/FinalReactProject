import { Provider } from 'react-redux';
import store from './store/store'
import './App.css';
import Datatable from './component/voucher/Datatable';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Result from './pages/result/container/Result';
import Dashboard from './pages/dashboard/Dashboard';
import StudentLogin from './component/student/StudentLogin';
import NewStudentRegistration from './component/student/NewStudentRegistration';
import Student from './pages/student/container/Student';
import Question from './pages/question/container/Question';
import User from './pages/user/container/User';
import Login from './component/user/Login';
import StudentDashboard from './component/student/StudentDashboard';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path='/register' element={<NewStudentRegistration />} />
          <Route path='/' element={<Student />} />
        <Route path='/admin' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}>
          <Route path='student' element={<StudentDashboard />} />
          <Route path='result' element={<Result/>}/>
          <Route path='voucher' element={<Datatable/>}/>
          <Route path='question' element={<Question/>}/>
          <Route path='user' element={<User/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
    </Provider>
  );
}

export default App;
