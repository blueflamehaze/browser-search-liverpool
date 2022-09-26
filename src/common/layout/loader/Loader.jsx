import React from "react";
import { Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import "./Loader.css";

function Loader() {
  return (
    <Grid container className="loader__container">
      <Grid item xs={12} md={12} lg={12}>
        <CircularProgress />
      </Grid>
    </Grid>
  );
}

export default Loader;
