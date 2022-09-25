import React from "react";
import { useGetAllPeopleQuery } from "../../services/api";
import { Grid } from "@mui/material";
import ProductCard from "../../components/ProductCard";
import "./Home.css";

function Home() {
  const { isLoading, data, isError } = useGetAllPeopleQuery();

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1>Productos</h1>
          <Grid container className="home">
            {data?.results.map((productInfo, index) => {
              return (
                <>
                  <Grid
                    item
                    xs={12}
                    md={4}
                    lg={4}
                    className="card__m"
                    key={index}
                  >
                    <ProductCard productInfo={productInfo} />
                  </Grid>
                </>
              );
            })}
          </Grid>
        </>
      )}
    </>
  );
}

export default Home;
