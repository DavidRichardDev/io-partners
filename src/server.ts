import app from './app'
import * as dotenv from 'dotenv'

dotenv.config()
const server = app.express.listen(process.env.TEST === true ? 3002 : 3001)

export default server