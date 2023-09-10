import jwt from 'jsonwebtoken'
import { TokenPayload_T } from '../shared/types' 
import UserModel from '../DataFlow/mongo_database/Models/UserModel'


type Req_T = {
    headers: {
        authorization: string
    },
    // locals: {
    //     TokenPayload: TokenPayload_T
    // }
}

const CheckAccessToken = async (req: Req_T, res: any, next: any) => {
    try {
        let AccessToken = req.headers.authorization.split(' ')[1]
        console.log(req.headers.authorization)
        jwt.verify(AccessToken, process.env.JWT_ACCESS_KEY!)
        
        let TokenPayload = jwt.decode(AccessToken) as TokenPayload_T
        console.log(TokenPayload)

        const DoesUserExist = await UserModel.exists({_id: TokenPayload.user_id})
        if(!DoesUserExist) return res.status(401).json({message: 'Пользователь не найден'})

        res.locals.TokenPayload = TokenPayload
        next()
    } catch(e) {
        console.log(e)
        res.sendStatus(403)
    }
}

export default CheckAccessToken