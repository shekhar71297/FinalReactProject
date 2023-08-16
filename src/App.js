
import './App.css';
import Datatable from './component/voucher/Datatable';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Result from './pages/result/container/Result';
import User from './pages/user/container/User';
import { Provider } from 'react-redux';
import store from './store/store'
import Dashboard from './pages/dashboard/Dashboard';
import Login from './component/user/Login';
function App() {
  return (
    <div className="App">

      <Provider store={store}>

        <BrowserRouter>
          <Routes>
            <Route path='/admin' element={<Login/>}/>
            <Route path='/dashboard' element={<Dashboard />}>
              <Route path='result' element={<Result />} />
              <Route path='voucher' element={<Datatable />} />
              <Route path='user' element={<User />} />
            </Route>
          </Routes>
        </BrowserRouter>

      </Provider>
    </div>
  );
}

export default App;
