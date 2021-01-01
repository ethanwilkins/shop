import PropTypes from "prop-types";
import { Delete } from "@material-ui/icons";
import { Spinner } from "react-bootstrap";

const List = ({ images, deleteImage }) => {
  return (
    <>
      {images ? (
        <>
          {images
            .slice()
            .reverse()
            .map(({ _id, data }) => {
              return (
                <div key={_id}>
                  <img
                    src={`data:image/jpeg;base64,${data}`}
                    alt="Data could not render."
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

List.propTypes = {
  images: PropTypes.array,
  deleteImage: PropTypes.func.isRequired,
};

export default List;
