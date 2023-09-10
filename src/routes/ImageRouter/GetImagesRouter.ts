import { Router } from "express"
import Controller from "./Controller"
import CheckAccessToken from "../../middlewares/CheckAccessToken"


const GetPinsRouter = () => {
    const router = Router()
    router.post('/', CheckAccessToken, Controller.addImage)
    router.get('/', CheckAccessToken, Controller.getImages)
    router.delete('/:image_id', CheckAccessToken, Controller.deleteImage)
    return router
}

export default GetPinsRouter