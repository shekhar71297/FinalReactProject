import { Provider } from 'react-redux';
import store from './store/store'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Result from './pages/result/container/Result';
import Dashboard from './pages/dashboard/Dashboard';

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
import QuizzApp from './component/QuizzApp';
import PrivateRoute from './component/PrivateRoute';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
       <QuizzApp/>
        <BrowserRouter>
          <Routes>
            <Route path='/admin' element={<Login />} />
            <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>}>
              <Route path='student' element={<PrivateRoute><Student /></PrivateRoute>} />
              <Route path='result' element={<PrivateRoute><Result /></PrivateRoute>} />
              <Route path='voucher' element={<PrivateRoute><Vouchermodule /></PrivateRoute>} />
              <Route path='question' element={<PrivateRoute><Question /></PrivateRoute>} />
              <Route path='user' element={<PrivateRoute><User /></PrivateRoute>} />
              <Route path='feedback' element={<PrivateRoute><Feedback /></PrivateRoute>} />
              <Route path='exam' element={<PrivateRoute><Exam /></PrivateRoute>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
