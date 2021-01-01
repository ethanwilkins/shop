import { useState } from "react";
import PropTypes from "prop-types";
import { FormGroup, Input, Button } from "@material-ui/core";

const ImagesForm = ({ handleSubmit }) => {
  const [image, setImage] = useState("");

  return (
    <form
      onSubmit={(e) => handleSubmit(e, image)}
      style={{ marginBottom: "12px" }}
    >
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

ImagesForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default ImagesForm;
