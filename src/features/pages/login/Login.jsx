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
  Alert,
  Snackbar,
} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [openWarning, setOpenWarning] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
    navigate("/products");
  };

  const handleWarningClose = () => {
    setOpenWarning(false);
  };

  const handleSuccessClose = () => {
    setOpenSuccess(false);
  };

  const handleErrorClose = () => {
    setOpenError(false);
  };

  const handleLogin = () => {
    if (email && password) {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((data) => {
          setOpenSuccess(true);
        })
        .catch((error) => {
          setEmail("");
          setPassword("");
          setOpenError(true);
        });
    } else {
      setOpenWarning(true);
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
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={handleErrorClose}
      >
        <Alert
          severity="error"
          sx={{ width: "100%" }}
          onClose={handleErrorClose}
        >
          Ha ocurrido un error, por favor verifica que te hayas registrado
          previamente.
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSuccess}
        autoHideDuration={6000}
        onClose={handleSuccessClose}
      >
        <Alert
          severity="success"
          sx={{ width: "100%" }}
          onClose={handleSuccessClose}
        >
          ¡Has iniciado sesión!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openWarning}
        autoHideDuration={6000}
        onClose={handleWarningClose}
      >
        <Alert
          severity="warning"
          sx={{ width: "100%" }}
          onClose={handleWarningClose}
        >
          Ambos campos son obligatorios, por favor completarlos
        </Alert>
      </Snackbar>
      <Grid container className="login__container">
        <Grid item xs={10} md={8} lg={6}>
          <Card sx={{ backgroundColor: "#f6f6f6", paddingTop: 5 }}>
            <CardContent>
              <LockOpenIcon className="form__icon" />
              <h2>Login</h2>
              <Box component="form" noValidate autoComplete="off">
                <FormControl
                  sx={{ m: 1, width: "70%" }}
                  variant="standard"
                  required
                >
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </FormControl>
                <FormControl
                  required
                  sx={{ m: 1, width: "70%" }}
                  variant="standard"
                >
                  <InputLabel htmlFor="password">Contraseña</InputLabel>
                  <Input
                    id="password"
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
