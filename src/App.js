import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Addform from './components/question/Addform';
import Header from './components/question/Header';
import Questiontable from './components/question/Questiontable'



function App() {
  return (
    <div className="App">
      
      <Header/>
      <Addform/>
      <Questiontable/>
      
      
      
    </div>
  );
}

export default App;
