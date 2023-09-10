import dotenv from 'dotenv'
import app from './app'
import DBconnect from './DataFlow/mongo_database/DBconnect'

dotenv.config()

const start = () => {
    let PORT = process.env.PORT || 3000
    try {
        DBconnect()
        
        app.listen(PORT, () => {
            console.log('server is running on port ' + PORT)
        })
    } catch (e) {
        console.log(e)
    }
}

start()