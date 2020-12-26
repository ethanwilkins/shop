import React, { useState, useEffect } from "react";
import axios from "axios";

import { Spinner } from "react-bootstrap";
import { Delete } from "@material-ui/icons";

import ImageForm from "../../components/Images/Form";

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

  const deleteImage = (id) => {
    axios
      .delete(`/images/${id}`)
      .then((res) => {
        window.location.href = "/images";
      })
      .catch((err) => {
        alert("Was not able to delete the image.");
      });
  };

  return (
    <>
      {images ? (
        <>
          <ImageForm />

          {images.map(({ _id, name, path }) => {
            const url = "/" + path;
            return (
              <div>
                <img src={url} alt={`${url}, (${name})`} key={_id} />

                <Delete
                  onClick={() =>
                    window.confirm(
                      "Are you sure you want to delete this image?"
                    ) && deleteImage(_id)
                  }
                />
              </div>
            );
          })}
        </>
      ) : (
        <Spinner animation="border" />
      )}
    </>
  );
};

export default List;
