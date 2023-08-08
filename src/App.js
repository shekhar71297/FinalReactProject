import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import Student from './pages/student/container/Student';
import User from './pages/user/container/User'
 
import Login from './component/user/Login';
import Sidenav from './pages/Sidenav';
import store from './store/store'
import { Provider } from 'react-redux';

 

function App() {
  return (
    <div className="App">

      <Provider store={store}>
      
      <BrowserRouter>
    {/* <Student/> */}
    <Routes>

      <Route path="/" element={<Login/>}/>
     <Route path="user" element={<User/>}/>
     <Route path='dashboard'element={<Sidenav/>}/>
     
    </Routes>
     
    </BrowserRouter>
    </Provider>
    </div>
  );
}

export default App;
