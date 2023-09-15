let EasyYandexS3 = require('easy-yandex-s3')
import dotenv from 'dotenv'

dotenv.config()

// Инициализация
let s3 = new EasyYandexS3({
    auth: {
        accessKeyId: process.env.YANDEX_ACCESS_KEY_ID,
        secretAccessKey: process.env.YANDEX_SECRET_ACCESS_KEY,
    },
    Bucket: process.env.YANDEX_BUCKET_NAME, // например, "my-storage",
    debug: true, // Дебаг в консоли, потом можете удалить в релизе
});

export default s3

