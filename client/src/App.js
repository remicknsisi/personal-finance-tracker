import React, {useContext} from "react";
import { UserProvider } from "./context/UserProvider.js";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";
import './App.css';

function App() {
  return (
<div className="App">
      <UserProvider>
      <header className="App-header">
        <Routes>
          {/* <Route path="/" element={<Dashboard/>}/> */}
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </header>
      </UserProvider>
    </div>
  );
}

export default App;
