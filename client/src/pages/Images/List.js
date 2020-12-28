import React, { useState, useEffect } from "react";
import axios from "axios";

import { Spinner } from "react-bootstrap";

import ImagesForm from "../../components/Images/Form";
import ImagesList from "../../components/Images/List";

const List = () => {
  const [images, setImages] = useState(null);

  useEffect(() => {
    axios
      .get("/images/")
      .then((res) => {
        setImages(res.data);
      })
      .catch((err) => {});
  }, [images]);

  return (
    <>
      {images ? (
        <>
          <ImagesForm />
          <ImagesList images={images} />
        </>
      ) : (
        <Spinner animation="border" />
      )}
    </>
  );
};

export default List;
