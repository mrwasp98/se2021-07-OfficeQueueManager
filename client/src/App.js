import './App.css';
import "bootstrap/dist/css/bootstrap.css";
//import {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, } from "react-router-dom";

import AdminHomepage from './Components/AdminHomepage';

function App() {

  return (
   <>
    <Router>
      <Route exact path="/admin" render={()=><AdminHomepage/>}/>
    </Router>
   </>
  );
}

export default App;
