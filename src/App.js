import { Provider } from 'react-redux';
import './App.css';
// import Result from './pages/result/container/Result';
// import Student from './pages/student/container/Student';
import store from './store/store'
import Sidenav from './pages/Sidenav';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
     
      <Provider  store={store}>
       <Routes>
        {/* <Route path='Admin/:id' element={}></Route> */}
       </Routes>
       <Sidenav/>
         {/* <Student/> */}
         {/* <Result/> */}
       
    </Provider>

    

    </div>
  );
}

export default App;
