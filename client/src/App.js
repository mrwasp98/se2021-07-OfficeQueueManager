import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';

function App() {

  const [message, setMessage] = useState("No");

  useEffect(()=>{
    fetch('http://localhost:3000/api/test', {method:"GET"})
    .then(res=>res.json())
    .then(m => setMessage(m.textsent)
    )
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p> Funziona? {message}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
