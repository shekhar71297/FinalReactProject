
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Result from './pages/result/container/Result';
import { Provider } from 'react-redux';
import store from './store/store'
import Dashboard from './pages/dashboard/Dashboard';
import Vouchermodule from './pages/voucher/container/Vouchermodule';
function App() {
  return (
    <div className="App">
     
      <Provider  store={store}>
      
      <BrowserRouter>
      <Routes>
        <Route path='/dashboard' element={<Dashboard/>}>
          <Route path='result' element={<Result/>}/>n
           <Route path='voucher' element={<Vouchermodule/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
    </Provider>
    </div>
  );
}

export default App;
