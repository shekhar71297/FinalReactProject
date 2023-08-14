import { Provider } from 'react-redux';
import './App.css';

import store from './store/store'
// import Sidenav from './pages/Sidenav';



import './App.css';


import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Result from './pages/result/container/Result';

function App() {
  return (
    <div className="App">
     
      <Provider  store={store}>
      
      <BrowserRouter>
      <Routes>
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='result' element={<Result/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
       
    </Provider>

    

    {/* <Student /> */}
   
    </div>
  );
}

export default App;
