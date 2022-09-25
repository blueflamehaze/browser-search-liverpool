import React from "react";
import { Card, CardContent } from "@mui/material";
import noImage from "../../../assets/noImage.jpg";
import "./ProductCard.css";
import "../../../App.css";

function ProductCard({ productInfo: { image, name, gender, height, url } }) {
  return (
    <Card>
      <CardContent>
        <h1>{name}</h1>
        <img src={image ? image : noImage} className="card__img" />
        {/* Simulate price with height because it's a number */}
        <p className="price">
          Precio:
          <span className="color"> $ {height}</span>
        </p>
        <p class="description">
          <span>Descripción: </span>
          {gender}
        </p>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
