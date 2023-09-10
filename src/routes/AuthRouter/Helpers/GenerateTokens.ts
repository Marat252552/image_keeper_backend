import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { TokenPayload_T } from '../../../shared/types'

dotenv.config()

const GenerateTokens = (payload: TokenPayload_T) => {
    let AccessKey = process.env.JWT_ACCESS_KEY!
    let RefreshKey = process.env.JWT_REFRESH_KEY!
    let accessToken = jwt.sign(payload, AccessKey, { expiresIn: '30m' })
    let refreshToken = jwt.sign(payload, RefreshKey, { expiresIn: '1d' })
    return { accessToken, refreshToken }
}

export default GenerateTokens