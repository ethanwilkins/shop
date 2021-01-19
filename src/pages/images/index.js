import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import ImagesForm from "../../components/Images/Form";
import ImagesList from "../../components/Images/List";
import useUsersStore from "../../stores/users.store";
import { IMAGES } from "../../apollo/client/queries";
import { UPLOAD_IMAGE, DELETE_IMAGE } from "../../apollo/client/mutations";

const Index = () => {
  const [images, setImages] = useState(null);
  const user = useUsersStore((state) => state.user);
  const [uploadImage] = useMutation(UPLOAD_IMAGE);
  const [deleteImage] = useMutation(DELETE_IMAGE);
  const { data } = useQuery(IMAGES);

  useEffect(() => {
    setImages(data ? data.allImages : data);
  }, [data]);

  const handleSubmit = async (e, image) => {
    e.preventDefault();

    const { data } = await uploadImage({
      variables: { image: image, userId: user.id },
    });
    e.target.reset();
    setImages([...images, data.uploadImage.image]);
  };

  const deleteImageHandler = async (id) => {
    try {
      await deleteImage({
        variables: {
          id,
        },
      });
      // Removes deleted image from state
      setImages(images.filter((image) => image.id !== id));
    } catch {}
  };

  return (
    <>
      <ImagesForm handleSubmit={handleSubmit} />
      <ImagesList images={images} deleteImage={deleteImageHandler} />
    </>
  );
};

export default Index;
