import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import MyNav from './Components/MyNav';
import HomeButtons from './Components/HomeButtons';
//import {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, } from "react-router-dom";

import AdminHomepage from './Components/AdminHomepage';
import NewCounter from './Components/NewCounter';
import OfficerHomePage from './Components/OfficerHomePage';
import TicketAcquisitionPage from './Components/TicketAcquisitionPage';
import API from "./API/GetAPI.js";
import { useEffect, useState } from "react";

function App() {
  const [allServices, setAllServices] = useState([]);
  const [dirty, setDirty] = useState(true);
  useEffect(() => {
    if(dirty){
      API.getAllServices().then((services) => setAllServices(services));
    }
    setDirty(false);
  }, [dirty]);

  return (
    <>
      <Router>
        <Route path="/" render={() => <> <MyNav /> <HomeButtons /></>} />
        <Route exact path="/admin" render={() => <><AdminHomepage setDirty={setDirty} /> <NewCounter /></>} />
        <Route exact path="/officer" render={() => <><OfficerHomePage /></>} />
        <Route exact path="/customer" render={() => <><TicketAcquisitionPage services={allServices}/></>} />
      </Router>
    </>
  );
}

export default App;
