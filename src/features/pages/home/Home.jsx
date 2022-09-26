import React from "react";
import ProductCard from "../../components/product-card/ProductCard";
import { Link } from "react-router-dom";
import { useGetAllPeopleQuery } from "../../services/api";
import { Grid } from "@mui/material";
import "./Home.css";
import Loader from "../../../common/layout/loader/Loader";

function Home() {
  const { isLoading, data, isError } = useGetAllPeopleQuery();

  return (
    <>
      {isLoading ? (
        <Loader></Loader>
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
                    <Link to={`/products/${index + 1}`} className="link">
                      <ProductCard productInfo={productInfo} />
                    </Link>
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
