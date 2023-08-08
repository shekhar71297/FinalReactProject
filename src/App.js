import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Sidenav from './pages/Sidenav';
// import Sidenavbar from './pages/Sidenavbar';

// import Student from './pages/student/container/Student';
import NewStudentRegistration from './component/student/NewStudentRegistration'
import StudentDashboard from './component/student/StudentDashboard';
import NavBar from './component/student/NavBar';
import store from './store/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          {/* <Student/> */}
          <Routes>
            <Route path='/' element={<NavBar />} />
            <Route path='Register' element={<NewStudentRegistration />} />
            <Route path='dash' element={<StudentDashboard />} />
          </Routes>
          {/* <NewStudentRegistration/> */}
          
          {/* <Sidenav/> */}
        </BrowserRouter>
        {/* <Student /> */}

      </div>
    </Provider>

  );
}

export default App;
