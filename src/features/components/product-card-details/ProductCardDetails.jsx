import React from "react";
import { Grid, Card, CardContent } from "@mui/material";
import noImage from "../../../assets/noImage.jpg";
import "../../../App.css";
import "./ProductCardDetails.css";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

function ProductCardDetails({
  data: {
    image,
    name,
    birth_year,
    gender,
    hair_color,
    eye_color,
    mass,
    height,
  },
}) {
  return (
    <Card>
      <CardContent>
        <Grid container>
          <Grid item xs={12} md={6} lg={6}>
            <img src={image ? image : noImage} className="card__img" />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <h2 className="details__title">{name}</h2>
            <div className="details">
              <p>
                <span className="sp__title">Fecha de nacimiento: </span>{" "}
                {birth_year}
              </p>
              <p>
                <span className="sp__title">Género: </span> {gender}
              </p>
              <p>
                <span className="sp__title">Color de ojos: </span> {eye_color}
              </p>
              <p>
                <span className="sp__title">Color de cabello: </span>{" "}
                {hair_color}
              </p>
              <p>
                <span className="sp__title">Peso: </span> {mass} kg.
              </p>
              <p className="price">
                <span className="sp_border">
                  <LocalOfferIcon /> Precio: $ {height}
                </span>
              </p>
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default ProductCardDetails;
