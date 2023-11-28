import './App.css'; 
import Home from './10_Home.js'
import Movie from'./10_movie.js'
import Search from './10_Search.js' 

import { BrowserRouter as Router,Routes,Route,NavLink } from "react-router-dom";
import img1 from './/images/logo.0778c1f8.png'

function App() {
 

  return (
    <div className="App"  >
       <Router >
        <div className="header">
         <img src={img1} className="img1" style={{height:55,width:70}}></img>
          <NavLink  className="alink" to="/">Home</NavLink>
          <NavLink  className="alink"to="/movie">Movies</NavLink>
          <NavLink  className="alink"  to="/search">Search</NavLink>
      
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/movie" element={<Movie/>}></Route>
            <Route path="/search" element={<Search/>}></Route>
          </Routes>
        </div>

       </Router>   

     


      
    </div>
  );
}

export default App;
