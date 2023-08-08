import { BrowserRouter, Routes, Route } from 'react-router-dom/dist';
import './App.css';
import FeedbackModule from './component/feedback/FeedbackModule';
import FeedDash from '../src/component/feedback/FeedDash'
import StudentLogin from './component/student/StudentLogin';
import { Provider } from 'react-redux';
import store from './store/store'
import Sidenav from './pages/Sidenav';



function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<FeedbackModule/>}/>
          <Route path='feedback' element={<FeedbackModule/>}/>
          <Route path='dash' element={<FeedDash/>}/>
          <Route path='login' element={<StudentLogin/>}></Route>
          {/* <Route path='dashboard' element={<Sidenav/>}/> */}
        </Routes>
      </BrowserRouter>
      <Sidenav/>
    {/* <Student/> */}
    
    </div>
    </Provider>
  );
}

export default App;
