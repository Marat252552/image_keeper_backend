import ImageModel from "../../../DataFlow/mongo_database/Models/ImageModel";
import PinModel, {
  Image_T,
} from "../../../DataFlow/mongo_database/Models/ImageModel";
import { DeleteFile } from "../../../DataFlow/yandex_cloud/Actions";

const DeleteFromMongoAndYandex = (images: Image_T[]) => {
  return new Promise(async (resolve, reject) => {
    try {
      for await (const image of images) {
        const { _id, key } = image;
        await DeleteFile(key);
        await ImageModel.deleteOne({ _id });
      }
      resolve(null);
    } catch (e) {
      console.log(e);
      console.log("DeleteFromMongoAndYandex error");
      reject();
    }
  });
};

export default DeleteFromMongoAndYandex;
