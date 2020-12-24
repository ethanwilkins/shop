import React, { useState, useEffect } from "react";
import axios from "axios";

import { Spinner } from "react-bootstrap";

const List = () => {
  const [images, setImages] = useState(null);

  useEffect(() => {
    axios
      .get("/images/")
      .then((res) => {
        setImages(res.data);
      })
      .catch((err) => {});
  }, []);

  return <>{images ? "Images" : <Spinner animation="border" />}</>;
};

export default List;
