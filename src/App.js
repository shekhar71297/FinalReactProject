import { Provider } from 'react-redux';
import './App.css';
import Result from './pages/result/container/Result';
// import Student from './pages/student/container/Student';
import store from './store/store'

function App() {
  return (
    <div className="App">
     
      <Provider  store={store}>
       
         {/* <Student/> */}
         <Result/>
    </Provider>

    

    </div>
  );
}

export default App;
