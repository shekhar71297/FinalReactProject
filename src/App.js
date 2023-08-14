import { Provider } from 'react-redux';
import './App.css';
import store from './store/store'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Result from './pages/result/container/Result';
import QuestionMain from './pages/question/container/Question';


function App() {
  return (
    <Provider store={store}>
    <div className="App">
     
      <Provider  store={store}>
      
      <BrowserRouter>
      <Routes>
          <Route path='/dashboard' element={<Dashboard />}>
          <Route path='result' element={<Result/>}/>
          <Route path='question' element={<QuestionMain/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
       
        
       
    </Provider>

    

    
   
    </div>
    </Provider>
  );
}

export default App;
