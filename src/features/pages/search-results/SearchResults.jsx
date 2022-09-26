import React from "react";
import { useParams } from "react-router-dom";
import { useSearchCharacterQuery } from "../../services/api";
import { Grid } from "@mui/material";
import ProductCard from "../../components/product-card/ProductCard";
import "./SearchResults.css";

function SearchResults() {
  const params = useParams();
  const { isLoading, data, isError } = useSearchCharacterQuery(
    params.searchParams
  );
  return (
    <>
      {isLoading ? (
        <div>Loading..</div>
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
        <div>No hay resultados</div>
      )}
    </>
  );
}

export default SearchResults;
