import { GraphQLUpload } from "apollo-server-micro";
import Image from "../../models/image.model";
import saveImage from "../../utils/saveImage";

// fs, promisify, and unlink to delete img
import fs from "fs";
import { promisify } from "util";
const unlinkAsync = promisify(fs.unlink);

const imageResolvers = {
  FileUpload: GraphQLUpload,

  Query: {
    allImages: async () => {
      try {
        const images = await Image.find();
        return images;
      } catch (error) {
        throw error;
      }
    },
  },

  Mutation: {
    async uploadImage(_, { image, userId }) {
      try {
        const { createReadStream, mimetype } = await image;
        const extension = mimetype.split("/")[1];
        const path = "public/uploads/" + Date.now() + "." + extension;
        await saveImage(createReadStream, path);

        let newImage = await new Image({
          userId: userId,
          path: path.replace("public", ""),
        }).save();

        return { image: newImage };
      } catch (err) {
        throw new Error(err);
      }
    },

    async deleteImage(_, { id }) {
      try {
        const image = await Image.findById(id);
        await unlinkAsync("public" + image.path);
        await image.remove();
        return true;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

export default imageResolvers;
