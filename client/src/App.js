import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import MyNav from './Components/MyNav';
import HomeButtons from './Components/HomeButtons';
//import {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, } from "react-router-dom";

import AdminHomepage from './Components/AdminHomepage';

function App() {

  return (
   <>
    <Router>
      <Route path="/" render={() => <> <MyNav /> <HomeButtons/></>} />
      <Route exact path="/admin" render={()=> <AdminHomepage/>}/>
    </Router>
   </>
  );
}

export default App;
