<<<<<<< HEAD
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
// import Student from './pages/student/container/Student';
import Datatable from './component/voucher/Datatable';
// import {Provider} from 'react-redux'
import Sidenav from './pages/Sidenav';
=======

import './App.css';
>>>>>>> 7a841e6cca319c909ca50f7a805618b3773128e9

function App() {
  return (
    <div className="App">
<<<<<<< HEAD
      {/* <Sidenav/> */}
      <Datatable/>

      <BrowserRouter>
      <Routes>
      
        <Route path='/table' element={<Datatable/>}/>
        <Route path='dashboard' element={<Sidenav/>}/>
      </Routes>
      </BrowserRouter>
      

    {/* <Student/> */}
=======
   
>>>>>>> 7a841e6cca319c909ca50f7a805618b3773128e9
    </div>
  );
}

export default App;
