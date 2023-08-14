import { Provider } from 'react-redux';
import './App.css';
import store from './store/store'
import './App.css';

import './App.css';
import Datatable from './component/voucher/Datatable';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Result from './pages/result/container/Result';
import QuestionMain from './pages/question/container/Question';

import Dashboard from './pages/dashboard/Dashboard';
function App() {
  return (
    <Provider store={store}>
    <div className="App">
     
      <Provider  store={store}>
      
      <BrowserRouter>
      <Routes>
        <Route path='/dashboard' element={<Dashboard/>}>
          <Route path='result' element={<Result/>}/>n
          <Route path='voucher' element={<Datatable/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
       
    </Provider>
    </div>
    </Provider>
  );
}

export default App;
