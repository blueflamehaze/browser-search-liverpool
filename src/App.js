import React, { useState } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { selectUser } from "./features/store/userSlice";
import { Routes, Route } from "react-router-dom";
import Registro from "./features/pages/sign-up/SignUp";
import Login from "./features/pages/login/Login";
import Header from "./common/layout/Header";
import Home from "./features/pages/home/Home";
import SearchResults from "./features/pages/search-results/SearchResults";
import ProductDetails from "./features/pages/product-details/ProductDetails";

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
        <Route path="/products" element={user ? <Home /> : <Login />}></Route>
        <Route
          path="/products/:id"
          element={user ? <ProductDetails /> : <Login />}
        ></Route>
        <Route
          path="/search/:searchParams"
          element={user ? <SearchResults /> : <Login />}
        ></Route>
        <Route path="*" element={<h3>Error 404</h3>}></Route>
      </Routes>
    </div>
  );
}

export default App;
