import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import GetImagesRouter from './routes/ImageRouter/GetImagesRouter'
import ImagesCleaner from './LoopProcesses/ImagesCleaner/ImagesCleaner'
import fileUpload from 'express-fileupload'
import GetAuthRouter from './routes/AuthRouter/GetAuthRouter'
import cookieParser from 'cookie-parser'


const jsonBodyMiddleware = express.json()

export const corsOptions = 
{
    origin:['https://image-keeper-frontend.onrender.com', 'http://localhost:5173'],
    credentials:true,
    optionSuccessStatus:200
}

const app = express()
app.use(cookieParser())
app.use(fileUpload({}))
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(jsonBodyMiddleware)


const ImagesRouter = GetImagesRouter()
const AuthRouter = GetAuthRouter()


app.use('/images', ImagesRouter)
app.use('/auth', AuthRouter)


ImagesCleaner()

export default app