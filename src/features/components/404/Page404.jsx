import React from "react";
import { Grid, Button } from "@mui/material";
import Lottie from "react-lottie-player";
import { Link } from "react-router-dom";
import "../../../App.css";
import error404 from "../../../assets/error404.json";

function Page404() {
  return (
    <Grid container>
      <Grid item xs={12} md={6} lg={6} className="center">
        <Lottie
          loop
          animationData={error404}
          play
          style={{ width: "85%", height: "85%" }}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6} className="center">
        <div>
          <h1 className="color">¡Ops! No hay nada por aquí</h1>
          <h3>Al parecer has llegado a un lugar inexplorado.</h3>
          <h4>Asegúrate de que estés buscando la ruta correcta.</h4>
          <Link to={"/products"} className="link">
            <Button className="button__bg">Home</Button>
          </Link>
        </div>
      </Grid>
    </Grid>
  );
}

export default Page404;
