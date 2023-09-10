import express from 'express'
import cors from 'cors'
import GetFilesRouter from './routes/FilesRouter/GetFilesRouter'
import bodyParser from 'body-parser'
import GetImagesRouter from './routes/ImageRouter/GetImagesRouter'
import ImagesCleaner from './LoopProcesses/ImagesCleaner/ImagesCleaner'
import fileUpload from 'express-fileupload'
import GetAuthRouter from './routes/AuthRouter/GetAuthRouter'
import cookieParser from 'cookie-parser'


const jsonBodyMiddleware = express.json()

export const corsOptions = 
{
    origin:['http://localhost:5173', 'https://online-shop-front.onrender.com', 'https://marat252552.github.io/todolist_front', 'https://marat252552.github.io', 'https://todolist-front2.onrender.com'],
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


const FilesRouter = GetFilesRouter()
const ImagesRouter = GetImagesRouter()
const AuthRouter = GetAuthRouter()


app.use('/images', ImagesRouter)
app.use('/files', FilesRouter)
app.use('/auth', AuthRouter)
// app.use(express.static(path.resolve(__dirname, 'static')))


ImagesCleaner()

export default app