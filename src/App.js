import { Provider } from 'react-redux';
import store from './store/store'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Result from './pages/result/container/Result';
import Dashboard from './pages/dashboard/Dashboard';
import NewStudentRegistration from './component/student/NewStudentRegistration';
import Student from './pages/student/container/Student';
import Question from './pages/question/container/Question';
import User from './pages/user/container/User';
import Login from './component/user/Login';
import StudentDashboard from './component/student/StudentDashboard';
import Vouchermodule from './pages/voucher/container/Vouchermodule';
import Feedback from './pages/feedback/container/Feedback';
import FeedbackModule from './component/feedback/FeedbackModule';
import Exam from './pages/exam/container/Exam';
import SelectExam from './component/SelectExam';
import StartExam from './component/StartExam';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Student />} />
            <Route path='/select-exam' element={<SelectExam/>}/>
            <Route path='/start-exam:selectedExam' element={<StartExam/>}/>
            <Route path='/register' element={<NewStudentRegistration />} />
            <Route path='/admin' element={<Login />} />
            <Route path='/dashboard' element={<Dashboard />}>
              <Route path='student' element={<StudentDashboard />} />
              <Route path='result' element={<Result />} />
              <Route path='voucher' element={<Vouchermodule />} />
              <Route path='question' element={<Question />} />
              <Route path='user' element={<User />} />
              <Route path='feedback' element={<Feedback/>} />
              <Route  path='exam'  element={<Exam/>}         />
            </Route>
            <Route path='/form' element={<FeedbackModule/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
