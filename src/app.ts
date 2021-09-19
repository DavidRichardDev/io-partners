import express from 'express'
import cors from 'cors'
import routes from './routes'
import * as dotenv from 'dotenv'
import { connectDb } from './service/database'

class App {
  public express: express.Application

  public constructor() {
    this.express = express()
    this.middlewares();
    this.database();
    this.routes();
  }

  private middlewares(): void {
    this.express.use(express.json())
    this.express.use(cors())
  }

  private database(): void {
    dotenv.config()
    connectDb(process.env.TEST === true ? process.env.MONGODB_TEST_URL as string : process.env.MONGODB_URL as string)
  }

  private routes(): void {
    this.express.use('/api/v1', routes)
  }
}

export default new App()
