import React, { useState } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import { Routes, Route } from "react-router-dom";
import Registro from "./features/pages/registro/Registro";
import Login from "./features/pages/Login/Login";

function App() {
  const user = useSelector(selectUser);
  const [isRegistered, setisRegistered] = useState(false);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />}></Route>
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
