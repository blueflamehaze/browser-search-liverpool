import React from "react";
import { useParams } from "react-router-dom";
import { useGetCharacterQuery } from "../../services/api";
import { Grid } from "@mui/material";
import ProductCardDetails from "../../components/product-card-details/ProductCardDetails";
import "../../../App.css";

function ProductDetails() {
  const params = useParams();
  const { isLoading, data, isError } = useGetCharacterQuery(params.id);
  return (
    <>
      {isLoading ? (
        <div>Loading..</div>
      ) : (
        <>
          <h1>Detalles del producto</h1>
          <Grid container className="container__m">
            <Grid item xs={12} md={12} lg={12}>
              <ProductCardDetails data={data} />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}

export default ProductDetails;
