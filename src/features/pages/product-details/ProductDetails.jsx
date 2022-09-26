import React from "react";
import { useParams } from "react-router-dom";
import { useGetCharacterQuery } from "../../services/api";
import { Grid } from "@mui/material";
import ProductCardDetails from "../../components/product-card-details/ProductCardDetails";
import "../../../App.css";
import Loader from "../../../common/layout/loader/Loader";

function ProductDetails() {
  const params = useParams();
  /**
   * Get character by ID API /src/features/services/api.js
   * data {Object} - All characters in an array data.results
   * isLoading {Boolean} - When true, indicates that the query is currently loading for the first time, and has no data yet.
   * isError {Boolean} - When true, indicates that the query is in an error state.
   * @param {string} - character id from query params
   */
  const { isLoading, data, isError } = useGetCharacterQuery(params.id);
  return (
    <>
      {isLoading ? (
        <Loader />
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
