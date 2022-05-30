// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavigationBar } from './components/nav/NavigationBar'



function App() {
  return (
    <div className="App">
      <NavigationBar />
      {/* <header className="App-header">
        
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;

// import React from "react";
// import Header from "./Header";

// function App() {
// return (

// // Using the newly created Header
// // component in this main component
// <Header/>
// );
// }
// export default App;
