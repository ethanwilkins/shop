import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { Spinner } from "react-bootstrap";

import UserCard from "../../components/Users/Card";
import ImagesList from "../../components/Images/List";
import { USER, IMAGES } from "../../apollo/client/queries";
import { DELETE_USER, DELETE_IMAGE } from "../../apollo/client/mutations";

const Show = () => {
  const { query, router } = useRouter();
  const [user, setUser] = useState(null);
  const [images, setImages] = useState(null);
  const userRes = useQuery(USER, {
    variables: { name: query.name },
  });
  const imagesRes = useQuery(IMAGES);
  const [deleteUser] = useMutation(DELETE_USER);
  const [deleteImage] = useMutation(DELETE_IMAGE);

  useEffect(() => {
    setUser(userRes.data ? userRes.data.user : userRes.data);
  }, [userRes.data]);

  useEffect(() => {
    if (user && imagesRes.data) {
      setImages(
        imagesRes.data.allImages.filter((image) => image.userId === user._id)
      );
    }
  }, [imagesRes.data, user]);

  const deleteUserHandler = async (userId) => {
    try {
      await deleteUser({
        variables: {
          id: userId,
        },
      });
      router.push("/users");
    } catch {}
  };

  const deleteImageHandler = async (id) => {
    try {
      await deleteImage({
        variables: {
          id: id,
        },
      });
      // Removes deleted image from state
      setImages(images.filter((image) => image._id !== id));
    } catch {}
  };

  return (
    <>
      {user ? (
        <>
          <UserCard user={user} deleteUser={deleteUserHandler} />
          <ImagesList images={images} deleteImage={deleteImageHandler} />
        </>
      ) : (
        <Spinner animation="border" />
      )}
    </>
  );
};

export default Show;
