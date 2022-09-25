import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../../firebase";
import { login, logout } from "../../userSlice";

const Registro = ({ isRegistered }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister();
  };
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            id: authUser.uid,
            name: authUser.displayName ? authUser.displayName : authUser.email,
            lastSignIn: authUser.metadata.lastSignInTime,
            picture: authUser.photoURL
              ? authUser.photoURL
              : "@/assets/user-icon.png",
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  const handleRegister = () => {
    if (email && password) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((data) => alert("Registered successfully"))
        .catch((error) => alert(error));
    } else {
      alert("Campos vacíos");
    }
  };

  return (
    <>
      <h2>Registro</h2>
      <form>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ingresa tu correo electrónico"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingresa tu contraseña"
        />
        <button onClick={handleSubmit}>Enviar</button>
      </form>
    </>
  );
};

export default Registro;
