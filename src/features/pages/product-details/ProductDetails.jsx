import React from "react";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const params = useParams();
  console.log(typeof params.id);
  return (
    <div>
      <h2>Detalles del producto</h2>
    </div>
  );
}

export default ProductDetails;
