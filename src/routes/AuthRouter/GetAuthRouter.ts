import { Router } from "express"
import Controller from "./Controller"


const GetAuthRouter = () => {
    const router = Router()
    router.post('/signin', Controller.signin)
    router.post('/login', Controller.login)
    router.post('/islogindupl', Controller.isLoginDupl)
    router.get('/logged', Controller.isLogged)
    router.get('/refresh', Controller.refresh)
    router.delete('/logout', Controller.logout)
    return router
}

export default GetAuthRouter