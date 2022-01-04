import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import passport from 'passport'
import morgan from 'morgan'
import helmet from 'helmet'
import ExpressMongoSanitize from 'express-mongo-sanitize'

import './models'
import './config'

import router from './routes'
import { passportConfig } from './config'
import middlewares from './middlewares'

config()

const app = express()
const { PORT } = process.env

passportConfig(passport)
app.use(passport.initialize())
app.use(morgan('dev'))
app.use(helmet())
app.use(ExpressMongoSanitize())
app.use(middlewares)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`)
})
