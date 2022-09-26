import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../../firebase";
import { login, logout } from "../../store/userSlice";
import { Link, useNavigate } from "react-router-dom";
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
import "./SignUp.css";
import "../../../App.css";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Registro = ({ isRegistered }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    handleRegister();
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
        .then((data) => {
          setOpenSuccess(true);
          navigate("/products");
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
          Ha ocurrido un error, por favor verifica que no hayas registrado el
          correo previamente.
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
          ¡Te has registrado correctamente!
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
      <Grid container className="register__container">
        <Grid item xs={10} md={8} lg={6}>
          <Card className="card__bg">
            <CardContent>
              <SensorOccupiedIcon className="form__icon" />
              <h2>Registro</h2>
              <Box component="form" noValidate autoComplete="off">
                <FormControl
                  required
                  sx={{ m: 1, width: "70%" }}
                  variant="standard"
                >
                  <InputLabel htmlFor="standard-adornment-email">
                    Email
                  </InputLabel>
                  <Input
                    id="standard-adornment-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl
                  required
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
                  ¿Ya tienes una cuenta?{" "}
                  <span>
                    <Link to="/" className="links">
                      ¡Inicia sesión!
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
};

export default Registro;
