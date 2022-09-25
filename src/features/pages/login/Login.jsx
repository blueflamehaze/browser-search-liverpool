import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { login, logout } from "../../store/userSlice";
import "./Login.css";
import "../../../App.css";
import {
  Grid,
  Card,
  CardContent,
  Box,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
    navigate("/home");
  };

  const handleLogin = () => {
    if (email && password) {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((data) => alert("Logged in successfully"))
        .catch((error) => alert(error));
    } else {
      alert("Campos vacíos");
    }
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

  return (
    <>
      <Grid container className="login__container">
        <Grid item xs={10} md={8} lg={6}>
          <Card sx={{ backgroundColor: "#f6f6f6", paddingTop: 5 }}>
            <CardContent>
              <LockOpenIcon className="form__icon" />
              <h2>Login</h2>
              <Box component="form" noValidate autoComplete="off">
                <FormControl
                  fullWidth
                  sx={{ m: 1, width: "70%" }}
                  variant="standard"
                >
                  <InputLabel htmlFor="standard-adornment-password">
                    Email
                  </InputLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl
                  fullWidth
                  sx={{ m: 1, width: "70%" }}
                  variant="standard"
                >
                  <InputLabel htmlFor="standard-adornment-password">
                    Contraseña
                  </InputLabel>
                  <Input
                    id="standard-adornment-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Box>
              <Button
                variant="contained"
                onClick={handleSubmit}
                className="submit_button"
              >
                Enviar
              </Button>
              <div>
                <p className="account__text">
                  ¿No tienes cuenta?{" "}
                  <span>
                    <Link to="/register" className="links">
                      ¡Regístrate!
                    </Link>
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default Login;
