import { Schema, model } from "mongoose";


const OperativeFile = new Schema({
    file_name: {type: String, unique: true, required: true},
    uid: {type: String, unique: true, required: true},
    expiresAt: {type: Date, required: true},
    createdAt: {type: Date, default: () => Date.now()},
    session_id: {type: String, required: true}
})

const OperativeFileModel = model('operative_file', OperativeFile)

export default OperativeFileModel