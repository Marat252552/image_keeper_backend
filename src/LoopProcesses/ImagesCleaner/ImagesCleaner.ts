import PinModel, { Image_T } from "../../DataFlow/mongo_database/Models/ImageModel"
import { DeleteFile } from "../../DataFlow/yandex_cloud/Actions"
import { TEN_MINUTES, TEN_SECONDS } from "../../shared/TimePeriods"

import DeleteFromMongoAndYandex from "./processes/DeleteFromMongoAndYandex"


// Searches for expired and disposed pins and deletes them from mongo_database 
// and their corresponding files in yandex_cloud
const ImagesCleaner = () => {
    setInterval(async () => {
        try {
            // Images that have expiresAt value lower than Date.now()
            let expired_images: Image_T[] = await PinModel.findExpired() as any
            await DeleteFromMongoAndYandex(expired_images)

        } catch (e) {
            console.log('AutoImagesDeleter Error')
            console.log(e)
        }
    }, TEN_MINUTES)
}

export default ImagesCleaner