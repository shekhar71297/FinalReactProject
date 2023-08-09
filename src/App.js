import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Sidenav from './pages/Sidenav';
import Questiontable from './components/question/Questiontable';
import Addform from './components/question/Addform';
import Header from './components/question/Header';

function App() {
  return (
    <div className="App">
      <Header/>
      <Addform/>
      <Questiontable/>
      <Sidenav/>
    </div>
  );
}

export default App;
