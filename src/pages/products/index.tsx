import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Spinner } from "react-bootstrap";
import { PRODUCTS } from "../../apollo/client/queries";

const List = () => {
  const [products, setProducts] = useState(null);
  const { data } = useQuery(PRODUCTS);

  useEffect(() => {
    setProducts(data ? data.allProducts : data);
  }, [data]);

  return <>{products ? "Products" : <Spinner animation="border" />}</>;
};

export default List;
