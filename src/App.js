
import './App.css';
import Datatable from './component/voucher/Datatable';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Result from './pages/result/container/Result';
import Feedback from './pages/feedback/container/Feedback';
import { Provider } from 'react-redux';
import store from './store/store'
import Dashboard from './pages/dashboard/Dashboard';
import FeedbackModule from './component/feedback/FeedbackModule';
function App() {
  return (
    <div className="App">
     
      <Provider  store={store}>
      
      <BrowserRouter>
      <Routes>
        <Route path='/dashboard' element={<Dashboard/>}>
          <Route path='result' element={<Result/>}/>
          <Route path='feedback' element={<Feedback/>}/>
          <Route path='voucher' element={<Datatable/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
  
    </Provider>
    </div>
  );
}

export default App;
