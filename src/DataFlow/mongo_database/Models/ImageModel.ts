import { HydratedDocument, Model, Schema, model } from "mongoose";

interface ImageModel_T extends Model<Image_T> {}

export interface Image_T {
    _id: string,
    user_id: string,
    file_name: string,
    key: string,
    src: string
    createdAt: Date,
    expiresAt: Date,
    label: string
}

interface PinModel_T extends Model<Image_T> {
    findExpired(): Promise<HydratedDocument<Image_T>[]>,
    addView(_id: string): Promise<void>,
    findDisposed(): Promise<HydratedDocument<Image_T>[]>,
}

const Image = new Schema<Image_T, ImageModel_T>({
    user_id: {type: String, required: true},
    file_name: {type: String, required: true},
    key: {type: String, required: true, unique: true},
    label: {type: String, required: true},
    src: {type: String, required: true, unique: true},
    createdAt: {type: Date, default: () => Date.now()},
    expiresAt: {type: Date, required: true}
})

// Find images that are already expired according to their days_alive and createdAt values

Image.statics.findExpired = function() {
    let getCurrentDate = () => {
        return Date.now()
    }
    // 'expiresAt' date is lower than 'now' date
    return this.where('expiresAt').lt(getCurrentDate())
}


const ImageModel = model<Image_T, PinModel_T>('image', Image)

export default ImageModel