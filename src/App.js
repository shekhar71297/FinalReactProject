import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
// import Student from './pages/student/container/Student';
import Datatable from './component/voucher/Datatable';
// import {Provider} from 'react-redux'
import Sidenav from './pages/Sidenav';

function App() {
  return (
    <div className="App">
      {/* <Sidenav/> */}
      <Datatable/>

      <BrowserRouter>
      <Routes>
      
        <Route path='/table' element={<Datatable/>}/>
        <Route path='dashboard' element={<Sidenav/>}/>
      </Routes>
      </BrowserRouter>
      

    {/* <Student/> */}
    </div>
  );
}

export default App;
