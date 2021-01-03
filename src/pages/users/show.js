import React, { useState, useEffect } from "react";
import axios from "axios";

import { Spinner } from "react-bootstrap";

import UserCard from "../../components/Users/Card";
import ImagesList from "../../components/Images/List";

const Show = ({ match }) => {
  const [user, setUser] = useState(null);
  const [images, setImages] = useState(null);
  const userName = match.params.name;

  useEffect(() => {
    axios
      .get(`/users/${userName}`)
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {});
  }, [userName]);

  useEffect(() => {
    axios
      .get("/images/")
      .then((res) => {
        setImages(res.data.filter((image) => image.userId === user._id));
      })
      .catch((err) => {});
  }, [user]);

  return (
    <>
      {user ? <UserCard user={user} /> : <Spinner animation="border" />}

      {images && <ImagesList images={images} />}
    </>
  );
};

export default Show;
