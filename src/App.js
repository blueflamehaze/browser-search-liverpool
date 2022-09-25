import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import Registro from "./features/pages/registro/Registro";
import { Routes, Route } from "react-router-dom";

function App() {
  const user = useSelector(selectUser);
  const [isRegistered, setisRegistered] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Routes>
        <Route
          path="register"
          element={
            user ? (
              <>
                <h2>Usuario logeado</h2>
              </>
            ) : (
              <Registro isRegistered={isRegistered} />
            )
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
