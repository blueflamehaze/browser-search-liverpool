import React from "react";
import { Grid, Button } from "@mui/material";
import Lottie from "react-lottie-player";
import noData from "../../../assets/noData.json";
import "./NoResults.css";
import { Link } from "react-router-dom";
import "../../../App.css";

function NoResults() {
  return (
    <Grid container>
      <Grid item xs={12} md={6} lg={6} className="center">
        <Lottie
          loop
          animationData={noData}
          play
          style={{ width: "85%", height: "85%" }}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6} className="center">
        <div>
          <h1 className="color">¡Lo sentimos!</h1>
          <h3>No hemos encontrado ningún resultado para tu búsqueda.</h3>
          <h4>Asegúrate de que estás buscando el texto adecuado.</h4>
          <Link to={"/products"} className="link">
            <Button className="button__bg">Home</Button>
          </Link>
        </div>
      </Grid>
    </Grid>
  );
}

export default NoResults;
