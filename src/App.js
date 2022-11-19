
import './App.css';
import Principal from './Rutas/Principal/Principal';
import Header from './Rutas/Header/Header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Podcast from './Rutas/Podcast/Podcast';


function App() {
  return (
    <Router>
       <div className="App">
    <Header/>
      <main>
       <div> 
        <Routes>
        <Route exact path='/' element={<Principal />}/>
        <Route  path='/podcast/:id' element={<Podcast />}/>
          
        </Routes>
      
        </div>
      </main>
           
    </div>
   
    </Router>
   
     
   

  );
}

export default App;
