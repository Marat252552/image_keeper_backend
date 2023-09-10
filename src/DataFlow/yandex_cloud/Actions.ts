import path from "path";
import s3 from "./YandexBucketInit";
import GetPathToOperativeFolder from "../../shared/GetPathToOperative";


export let UploadImage = async (file: Buffer, file_name: string) => {
    let upload = await s3.Upload(
        {
            buffer: file,
            name: file_name
        },
        '/images/'
    );
    return upload
}

export let DeleteFile = (key: string) => {
    return s3.Remove(key)
}