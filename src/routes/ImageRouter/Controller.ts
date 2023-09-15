import { addImageReq_T, deleteImageReq_T, response_T, setLabelReq_T } from './types';
import { UploadImage } from '../../DataFlow/yandex_cloud/Actions';
import { UploadFile_T } from '../../shared/types';
import { TWENTY_FOUR_HOURS } from '../../shared/TimePeriods';
import { v4 } from 'uuid';
import ImageModel from '../../DataFlow/mongo_database/Models/ImageModel';
import { UploadedFile } from 'express-fileupload';

const FOUR_MEGABYTES = 4000000;
const days_alive = 100;

class Controller {
    async addImage(req: addImageReq_T, res: response_T) {
        try {
            if (!req.files || !req.files.file) {
                return res.status(400).json({ message: 'Прикрепите изображение к запросу' });
            }
            const file = req.files.file;
            // Проверка, если каким то образом файл имеет тип не UploadedFile а UploadedFile[]
            if (file instanceof Array) {
                return res.status(400).json({ message: 'Неверный формат файла' });
            }

            if (file.mimetype.split('/')[0] !== 'image') {
                return res.status(400).json({ message: 'Поддерживаются только изображения' });
            }

            if (file.size > FOUR_MEGABYTES) {
                return res
                    .status(413)
                    .json({ message: 'Размер файла не может быть больше 4х Мбайт' });
            }

            let { label = file.name } = req.body;
            const { user_id } = res.locals.TokenPayload;

            const file_name = v4() + '.' + file.mimetype.split('/')[1];
            let { Location, key }: UploadFile_T = await UploadImage(file.data, file_name);

            let days_in_timestamp_format = days_alive * TWENTY_FOUR_HOURS;
            let expiresAt = Date.now() + days_in_timestamp_format;

            const image = await ImageModel.create({
                file_name,
                label,
                expiresAt,
                key,
                src: Location,
                user_id,
            });

            res.status(200).json({ image });
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    }
    async getImages(_: any, res: response_T) {
        try {
            const { user_id } = res.locals.TokenPayload;

            let images = await ImageModel.find({ user_id }).select({
                _id: 1,
                src: 1,
                label: 1,
                createdAt: 1,
            });

            res.status(200).json({ images });
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    }
    async deleteImage(req: deleteImageReq_T, res: response_T) {
        try {
            const { image_id: _id } = req.params;
            const { user_id } = res.locals.TokenPayload;

            await ImageModel.deleteOne({ user_id, _id });

            res.sendStatus(200);
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    }
    async setLabel(req: setLabelReq_T, res: response_T) {
        try {
            const { image_id: _id, label } = req.body;
            const { user_id } = res.locals.TokenPayload;

            await ImageModel.updateOne({ _id, user_id }, { label });
            const image = await ImageModel.findOne({ _id, user_id });

            res.status(200).json({ image });
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    }
}

export default new Controller();
