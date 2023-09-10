

const verifyCaptchaAPI = async (value: string) => {
    let response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `secret=${process.env.CAPTCHA_SECRET_KEY}&response=${value}`
    })
    return await response.json()
}

export default verifyCaptchaAPI

