import React, { useState } from "react";
import axios from "axios";

import { FormGroup, Input, Button } from "@material-ui/core";

import useUsersStore from "../../stores/users.store";

const ImagesForm = () => {
  const [image, setImage] = useState("");
  const user = useUsersStore((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userId", user.userId);
    formData.append("image", image);

    axios
      .post("/images", formData)
      .then((res) => {
        e.target.reset();
      })
      .catch((err) => {
        alert(JSON.stringify(err));
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "12px" }}>
      <FormGroup>
        <Input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          style={{ fontSize: "10px", marginBottom: "12px" }}
        />
      </FormGroup>

      <Button variant="outlined" color="default" size="large" type="submit">
        Upload
      </Button>
    </form>
  );
};

export default ImagesForm;
