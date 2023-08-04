import { BrowserRouter, Routes, Route } from 'react-router-dom/dist';
import './App.css';
import FeedbackModule from './components/feedback/FeedbackModule';
import FeedDash from './components/feedback/FeedDash';
import StudentLogin from './components/student/StudentLogin';
import { Provider } from 'react-redux';
import store from './store/store'


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
        </Routes>
      </BrowserRouter>
    {/* <Student/> */}
    </div>
    </Provider>
  );
}

export default App;
