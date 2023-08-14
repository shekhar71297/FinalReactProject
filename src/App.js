import './App.css';
import store from './store/store'
import { Provider } from 'react-redux';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Result from './pages/result/container/Result';

import Student from './pages/student/container/Student';
import NewStudentRegistration from './component/student/NewStudentRegistration';
import StudentLogin from './component/student/StudentLogin';
import NavBar from './component/student/NavBar';



function App() {
  return (
    <div className="App">

      <Provider store={store}>
        <BrowserRouter>

          <Routes>
            <Route path='/' element={<StudentLogin />} />
            <Route path='/register' element={<NewStudentRegistration />} />
            <Route path='/dashboard' element={<Dashboard />}>
              <Route path='student' element={<Student />} />
              <Route path='result' element={<Result />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
