import React, { useState, useEffect } from "react";
import axios from "axios";
import Router from "next/router";
import { Spinner } from "react-bootstrap";

import baseUrl from "../../utils/baseUrl";
import UserCard from "../../components/Users/Card";
import ImagesList from "../../components/Images/List";

const Show = ({ user }) => {
  const [images, setImages] = useState(null);

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/images/list`)
      .then((res) => {
        setImages(res.data.images.filter((image) => image.userId === user._id));
      })
      .catch((err) => {});
  }, []);

  const deleteImage = (id) => {
    axios
      .delete(`${baseUrl}/api/images/${id}`)
      .then((res) => {
        setImages(images.filter((image) => image._id !== id));
      })
      .catch((err) => {});
  };

  const deleteUser = (userId) => {
    axios
      .delete(`${baseUrl}/api/users/${userId}`)
      .then((res) => {
        Router.push("/users");
      })
      .catch((err) => {});
  };

  return (
    <>
      <UserCard user={user} deleteUser={deleteUser} />
      <ImagesList images={images} deleteImage={deleteImage} />
    </>
  );
};

export async function getServerSideProps(ctx) {
  const { name } = ctx.query;
  const url = `${baseUrl}/api/users/${name}`;
  const response = await axios.get(url);

  return {
    props: { user: response.data.user },
  };
}

export default Show;
