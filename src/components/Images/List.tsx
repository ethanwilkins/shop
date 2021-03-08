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
            .map(({ id, path }) => {
              return (
                <div key={id}>
                  <img
                    src={baseUrl + path}
                    alt="Data could not render."
                    style={{ width: 300, display: "block" }}
                  />

                  <Delete
                    onClick={() =>
                      window.confirm(
                        "Are you sure you want to delete this image?"
                      ) && deleteImage(id)
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

export default List;
