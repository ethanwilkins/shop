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
      .then((res) => {})
      .catch((err) => {
        alert("Was not able to delete the image.");
      });
  };

  return (
    <>
      {images ? (
        <>
          <ImageForm />

          {images
            .slice()
            .reverse()
            .map(({ _id, path }) => {
              return (
                <div>
                  <img
                    src={path}
                    alt={path}
                    key={_id}
                    style={{ width: 300, display: "block" }}
                  />

                  <Delete
                    onClick={() =>
                      window.confirm(
                        "Are you sure you want to delete this image?"
                      ) && deleteImage(_id)
                    }
                    style={{ cursor: "pointer", marginBottom: 12 }}
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
