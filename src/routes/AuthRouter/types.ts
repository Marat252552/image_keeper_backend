

export type SigninReq_T = {
    body: {
        login: string, 
        password: string
    }
}

export type LoginReq_T = {
    body: {
        login: string,
        password: string,
        remember: boolean
    }
}

export type IsLoginDuplReq_T = {
    body: {
        login: string
    }
}

export type isLoggedReq_T = {
    headers: {
        authorization: string
    }
}

export type RefreshReq_T = {
    cookies: {
        refreshToken: string
    }
}