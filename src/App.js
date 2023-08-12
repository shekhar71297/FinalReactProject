import { Provider } from 'react-redux';
import './App.css';
import store from './store/store'
<<<<<<< HEAD
import { Provider } from 'react-redux';
=======
// import Sidenav from './pages/Sidenav';



import './App.css';


>>>>>>> 5f14fd79753fac7e18dee9df899fba5289221481
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
    </div>
<<<<<<< HEAD
    
=======
>>>>>>> 5f14fd79753fac7e18dee9df899fba5289221481
  );
}

export default App;
