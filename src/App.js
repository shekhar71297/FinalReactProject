import { Provider } from 'react-redux';
import store from './store/store'
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Result from './pages/result/container/Result';
import Dashboard from './pages/dashboard/Dashboard';
import Question from './pages/question/container/Question';
import User from './pages/user/container/User';
import Login from './component/user/Login';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/admin' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}>
          <Route path='result' element={<Result/>}/>
          <Route path='voucher' element={<Datatable/>}/>
          <Route path='question' element={<Question/>}/>
          <Route path='user' element={<User/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
    </Provider>
  );
}

export default App;
