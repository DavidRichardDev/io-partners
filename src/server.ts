import app from './app'

const server = app.express.listen(process.env.NODE_ENV === 'test' ? 3002 : 3001)

export default server