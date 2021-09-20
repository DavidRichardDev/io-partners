import mongoose from 'mongoose'

export async function connectDb(mongoUrl: string) {
  return await mongoose.connect(mongoUrl)
}
