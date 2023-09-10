import {Schema, model} from 'mongoose' 


const User = new Schema({
    login: {type: String, unique: true, required: true},
    password: {type: String, required: true},
})

const UserModel = model('user', User)

export default UserModel