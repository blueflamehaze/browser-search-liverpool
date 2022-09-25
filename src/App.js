import React, { useState } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { selectUser } from "./features/store/userSlice";
import { Routes, Route } from "react-router-dom";
import Registro from "./features/pages/sign-up/SignUp";
import Login from "./features/pages/login/Login";
import Header from "./common/layout/Header";
import Home from "./features/pages/home/Home";

function App() {
  const user = useSelector(selectUser);
  const [isRegistered, setisRegistered] = useState(false);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route
          path="/register"
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
        <Route path="/home" element={user ? <Home /> : <Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
