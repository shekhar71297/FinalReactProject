import { Provider } from 'react-redux';
import './App.css';
import store from './store/store'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Result from './pages/result/container/Result';
import Feedback from './pages/feedback/container/Feedback';
import FeedbackModule from './component/feedback/FeedbackModule';

function App() {
  return (
    <div className="App">
     
      <Provider  store={store}>
      
      <BrowserRouter>
      <Routes>
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='result' element={<Result/>}/>
          <Route path='feedback' element={<Feedback/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
  
    </Provider>
    </div>
  );
}

export default App;
