import React from "react";

const Login = () => {
  return (
    <>
      <h2>Login</h2>
      <form>
        <input type="email" placeholder="Ingresa tu correo electrónico" />
        <input type="password" placeholder="Ingresa tu contraseña" />
        <button>Enviar</button>
      </form>
    </>
  );
};

export default Login;
