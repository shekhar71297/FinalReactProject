
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
   
>>>>>>> 7a841e6cca319c909ca50f7a805618b3773128e9
    </div>
  );
}

export default App;
