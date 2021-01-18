import { createWriteStream } from "fs";

// Saves image file within public/uploads/
const saveImage = async (createReadStream, path) => {
  await new Promise((resolve, reject) => {
    const stream = createReadStream();

    stream
      .on("error", (error) => {
        unlink(path, () => {
          reject(error);
        });
      })
      .pipe(createWriteStream(path))
      .on("error", reject)
      .on("finish", resolve);
  });
};

export default saveImage;
