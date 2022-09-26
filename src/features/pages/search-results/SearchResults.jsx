import React from "react";
import { useParams } from "react-router-dom";
import { useSearchCharacterQuery } from "../../services/api";
import { Grid } from "@mui/material";
import ProductCard from "../../components/product-card/ProductCard";
import "./SearchResults.css";
import Loader from "../../../common/layout/loader/Loader";
import NoResults from "../../components/no-results/NoResults";

function SearchResults() {
  const params = useParams();
  /**
   * Get character by ID API /src/features/services/api.js
   * data {Object} - All characters in an array data.results
   * isLoading {Boolean} - When true, indicates that the query is currently loading for the first time, and has no data yet.
   * isError {Boolean} - When true, indicates that the query is in an error state.
   * @param {string} - search params from query params
   */
  const { isLoading, data, isError } = useSearchCharacterQuery(
    params.searchParams
  );
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : data.count >= 1 ? (
        <>
          <h1>Resultados de la búsqueda</h1>
          <Grid container className="search">
            {data?.results.map((productInfo, index) => {
              return (
                <>
                  <Grid
                    item
                    xs={12}
                    md={4}
                    lg={4}
                    key={index}
                    className="grid__margin"
                  >
                    <ProductCard productInfo={productInfo} />
                  </Grid>
                </>
              );
            })}
          </Grid>
        </>
      ) : (
        <NoResults />
      )}
    </>
  );
}

export default SearchResults;
