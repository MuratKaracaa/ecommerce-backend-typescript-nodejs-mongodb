import mongoose from 'mongoose'
import { config } from 'dotenv'
import { DEVELOPMENT, PRODUCTION } from '../constants'

config()

if (process.env.NODE_ENV === DEVELOPMENT) {
    mongoose.connect(process.env.DATABASE_URL_DEVELOPMENT!)
    mongoose.connection.on('connected', () => {
        console.log('Database Connected')
    })
    mongoose.connection.on('error', (error) => {
        console.warn(error)
    })
} else if (process.env.NODE_ENV === PRODUCTION) {
    mongoose.connect(process.env.DATABASE_URL_PRODUCTION!)
    mongoose.connection.on('connected', () => {
        console.log('Database Connected')
    })
    mongoose.connection.on('error', (error) => {
        console.warn(error)
    })
}
