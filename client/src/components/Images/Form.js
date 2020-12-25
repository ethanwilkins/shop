import React, { useState } from "react";
import axios from "axios";

import { FormGroup, Input, TextField, Button } from "@material-ui/core";

const ImageForm = () => {
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", imageName);

    axios
      .post("/images", formData)
      .then((res) => {
        alert(JSON.stringify(res));
      })
      .catch((err) => {
        alert(JSON.stringify(err));
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <TextField
          type="text"
          placeholder="Name"
          onChange={(e) => setImageName(e.target.value)}
          value={imageName}
          variant="outlined"
          margin="normal"
          label="Name"
        />
      </FormGroup>

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

export default ImageForm;
