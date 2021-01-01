import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import ImagesForm from "../../components/Images/Form";
import ImagesList from "../../components/Images/List";
import useUsersStore from "../../stores/users.store";

const Index = () => {
  const [images, setImages] = useState(null);
  const user = useUsersStore((state) => state.user);

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/images/list`)
      .then((res) => {
        setImages(res.data.images);
      })
      .catch((err) => {});
  }, []);

  const deleteImage = (id) => {
    axios
      .delete(`${baseUrl}/api/images/${id}`)
      .then((res) => {
        setImages(images.filter((image) => image._id !== id));
      })
      .catch((err) => {
        alert("Was not able to delete the image.");
      });
  };

  const handleSubmit = (e, image) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);

    axios
      .post(`${baseUrl}/api/images/upload`, formData, {
        // user._id sent as header as body parsing is disabled
        headers: { uid: user._id },
      })
      .then((res) => {
        e.target.reset();
        setImages([...images, res.data.image]);
      })
      .catch((err) => {
        alert(JSON.stringify(err));
      });
  };

  return (
    <>
      <ImagesForm handleSubmit={handleSubmit} />
      <ImagesList images={images} deleteImage={deleteImage} />
    </>
  );
};

export default Index;
