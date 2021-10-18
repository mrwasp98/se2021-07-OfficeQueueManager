import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import MyNav from './Components/MyNav';
import HomeButtons from './Components/HomeButtons';
import { BrowserRouter as Router, Route, } from "react-router-dom";

import AdminHomepage from './Components/AdminHomepage';
import NewCounter from './Components/NewCounter';
import OfficerHomePage from './Components/OfficerHomePage';
import TicketAcquisitionPage from './Components/TicketAcquisitionPage';
import API from "./API/GetAPI.js";
import { useEffect, useState } from "react";

function App() {
  const [allServices, setAllServices] = useState([]);
  const [estimation, setEstimation] = useState([]);
  const [allOfficers, setAllOfficers] = useState([]);
  const [flagOfficer, setFlagOfficer] = useState([]);
  const [dirty, setDirty] = useState(true);

  useEffect(() => {
    if (flagOfficer) {
      API.getAllServices().then((officers) => setAllOfficers(officers))  
      setFlagOfficer(false);
    }
    
  }, []);

  useEffect(() => {
    if (dirty) {
      API.getAllServices().then((services) => setAllServices(services));
      setDirty(false);
    }
  }, [dirty]);

  useEffect(() => {
    console.log("estimation");
    API.getServedClients().then((estimation) => setEstimation(estimation));
    console.log({ estimation });
  },[]);

 /* useEffect(() => { 
    API.getWhoIsLastOne().then((lastOne) => setLastOne(lastOne));
  }, []);*/

  useEffect(() => {
    if (flagOfficer) {
      setFlagOfficer(false);
      API.getActiveOfficers().then((officer) => setAllOfficers(officer));
    }
  }, [flagOfficer]);

  return (
    <>
      <Router>
        <Route path="/" render={() => <> <MyNav /> <HomeButtons /></>} />
        <Route exact path="/admin" render={() => <><AdminHomepage setDirty={setDirty} /> <NewCounter services={allServices} /></>} />
        <Route exact path="/officer" render={() => <><OfficerHomePage officers={allOfficers} setFlagOfficer={() => setFlagOfficer(true)} /></>} />
        <Route exact path="/customer" render={() => <><TicketAcquisitionPage services={allServices} estimation={estimation} /></>} />
      </Router>
    </>
  );
}

export default App;
