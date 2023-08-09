import { Provider } from 'react-redux';
import './App.css';

import store from './store/store'
// import Sidenav from './pages/Sidenav';



import './App.css';
import FeedbackModule from './component/feedback/FeedbackModule';
import FeedDash from '../src/component/feedback/FeedDash'
import StudentLogin from './component/student/StudentLogin';
import { Provider } from 'react-redux';
import store from './store/store'
import Sidenav from './pages/Sidenav';




import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Result from './pages/result/container/Result';

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
