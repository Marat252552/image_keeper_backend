import UserModel from '../../../DataFlow/mongo_database/Models/UserModel'
import bcrypt from 'bcrypt'


const FindUserAndComparePassword = async (login: string, password: string, res: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await UserModel.findOne({login})
            if(!user) {
                res.status(400).json({message: 'Пользователя с таким логином нет'}).end()
                resolve(false)
                return
            }
            let isPasswordValid = bcrypt.compareSync(password, user!.password!)
            if(!isPasswordValid) {
                res.status(400).json({message: 'Неверный пароль'}).end()
                resolve(false)
                return
            }
            resolve(true)
        } catch(e) {
            console.log(e)
            res.status(500).json({message: 'Что-то пошло не так'}).end()
            resolve(false)
        }
    })
}

export default FindUserAndComparePassword