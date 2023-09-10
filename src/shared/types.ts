export type UploadFile_T = {
    ETag: string,
    Location: string,
    key: string,
    Key: string,
    Bucket: string
}

export type User_T = {
    _id: string,
    login: string, 
    password: string
}

export type TokenPayload_T = {
    user_id: string,
    login: string
}

