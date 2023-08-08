import { Provider } from 'react-redux';
import './App.css';
// import Result from './pages/result/container/Result';
// import Student from './pages/student/container/Student';
import store from './store/store'
import Sidenav from './pages/Sidenav';
import { Route, Routes } from 'react-router-dom';
// import Sidenav from './pages/Sidenav';
// import Sidenavbar from './pages/Sidenavbar';

import Student from './pages/student/container/Student';

import './App.css';

function App() {
  return (
    <div className="App">
     
      <Provider  store={store}>
       <Routes>
        {/* <Route path='Admin/:id' element={}></Route> */}
       </Routes>
       <Sidenav/>
         <Student/>
         {/* <Result/> */}
       
    </Provider>

    

    {/* <Student /> */}
   
    </div>
  );
}

export default App;
