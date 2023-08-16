import { Provider } from 'react-redux';
import store from './store/store'
import './App.css';
import Datatable from './component/voucher/Datatable';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Result from './pages/result/container/Result';
import Dashboard from './pages/dashboard/Dashboard';
import Question from './pages/question/container/Question';
function App() {
  return (
    <Provider store={store}>
    <div className="App">
     
      <Provider  store={store}>
      
      <BrowserRouter>
      <Routes>
        <Route path='/dashboard' element={<Dashboard/>}>
          <Route path='result' element={<Result/>}/>
          <Route path='voucher' element={<Datatable/>}/>
          <Route path='question' element={<Question/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
       
    </Provider>
    </div>
    </Provider>
  );
}

export default App;
