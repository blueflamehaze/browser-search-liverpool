import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import Login from "./features/pages/login/Login";

function App() {
  const user = useSelector(selectUser);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {user ? (
          <>
            <h2>Usuario logeado</h2>
          </>
        ) : (
          <>
            <Login />
          </>
        )}
      </header>
    </div>
  );
}

export default App;
