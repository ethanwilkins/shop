import React, { useState, useEffect } from "react";
import axios from "axios";

import { Spinner } from "react-bootstrap";

const List = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    axios
      .get("/products/")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {});
  }, []);

  return <>{products ? "Products" : <Spinner animation="border" />}</>;
};

export default List;
