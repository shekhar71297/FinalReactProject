
import './App.css';
import Datatable from './component/voucher/Datatable';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Result from './pages/result/container/Result';
import { Provider } from 'react-redux';
import store from './store/store'
import Dashboard from './pages/dashboard/Dashboard';
import StudentLogin from './component/student/StudentLogin';
import NewStudentRegistration from './component/student/NewStudentRegistration';
import Student from './pages/student/container/Student';
function App() {
  return (
    <div className="App">
     
      <Provider  store={store}>
      
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<StudentLogin />} />
      <Route path='/register' element={<NewStudentRegistration />} />

        <Route path='/dashboard' element={<Dashboard/>}>
          <Route path='result' element={<Result/>}/>
          <Route path='voucher' element={<Datatable/>}/>
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
