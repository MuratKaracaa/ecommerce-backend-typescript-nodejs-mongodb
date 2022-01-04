import { PassportStatic } from 'passport'

import { Strategy, ExtractJwt } from 'passport-jwt'
import { config } from 'dotenv'
import { readFileSync } from 'fs'

import { publicKeyPath, roles } from '../constants'

import User from '../models/User'

config()

const PUB_KEY: string = readFileSync(publicKeyPath, 'utf-8')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256'],
}

const strategy = new Strategy(options, async (payload, done) => {
    try {
        const user = await User.findOne({ _id: payload.sub })
        if (user) {
            const { role } = user
            if (role === roles.butik) {
                await user.populate('butikProfile')
            } else if (role === roles.customer) {
                await user.populate('customerProfile')
            }
            return done(null, user)
        } else {
            return done(null, false)
        }
    } catch (error) {
        return done(error, null)
    }
})

export const passportConfig = (passport: PassportStatic) => {
    passport.use(strategy)
}
