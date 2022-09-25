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
  const [name, setName] = useState("");

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister();
    navigate("/home");
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
    if (name && email && password) {
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
      <Grid container className="register__container">
        <Grid item xs={10} md={8} lg={6}>
          <Card className="card__bg">
            <CardContent>
              <SensorOccupiedIcon className="form__icon" />
              <h2>Registro</h2>
              <Box component="form" noValidate autoComplete="off">
                <FormControl
                  fullWidth
                  sx={{ m: 1, width: "70%" }}
                  variant="standard"
                >
                  <InputLabel htmlFor="standard-adornment-password">
                    Nombre
                  </InputLabel>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>
                <FormControl
                  fullWidth
                  sx={{ m: 1, width: "70%" }}
                  variant="standard"
                >
                  <InputLabel htmlFor="standard-adornment-password">
                    Email
                  </InputLabel>
                  <Input
                    id="standard-adornment-password"
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
