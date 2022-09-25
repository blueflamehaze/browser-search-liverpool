import React from "react";
import "./Login.css";
import { Grid, Card, CardContent } from "@mui/material";

function Login() {
  return (
    <>
      <Grid container className="login__container">
        <Grid xs={10} md={8} lg={6}>
          <Card>
            <CardContent>
              <img />
              <h2>Login</h2>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default Login;
