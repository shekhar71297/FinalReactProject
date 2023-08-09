
import './App.css';

function App() {
  return (
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
  );
}

export default App;
