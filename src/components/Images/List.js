import PropTypes from "prop-types";
import { Delete } from "@material-ui/icons";
import { Spinner } from "react-bootstrap";
import baseUrl from "../../utils/baseUrl";

const List = ({ images, deleteImage }) => {
  return (
    <>
      {images ? (
        <>
          {images
            .slice()
            .reverse()
            .map(({ _id, path }) => {
              return (
                <div key={_id}>
                  <img
                    src={baseUrl + path}
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
