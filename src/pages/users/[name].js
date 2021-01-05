import React, { useState, useEffect } from "react";
import axios from "axios";

import { Spinner } from "react-bootstrap";

import baseUrl from "../../utils/baseUrl";
import UserCard from "../../components/Users/Card";
import ImagesList from "../../components/Images/List";

const Show = ({ user }) => {
  const [images, setImages] = useState(null);

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

export async function getServerSideProps(ctx) {
  const { name } = ctx.query;
  const url = `${baseUrl}/api/users/${name}`;
  const response = await axios.get(url);

  return {
    props: { user: response.data.user },
  };
}

export default Show;
