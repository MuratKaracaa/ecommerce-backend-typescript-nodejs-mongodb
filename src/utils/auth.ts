import crypto from 'crypto'
import jsonwebtoken from 'jsonwebtoken'
import { config } from 'dotenv'
import moment from 'moment'
import { readFileSync } from 'fs'

import { calculateTokenExpiration } from '.'
import { privateKeyPath } from '../constants'

config()

const PRIV_KEY = readFileSync(privateKeyPath, 'utf-8')

export const generateSaltAndHash = (password: string) => {
    const salt = crypto.randomBytes(32).toString('hex')
    const hash = crypto
        .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
        .toString('hex')

    return { salt, hash }
}

export const issueToken = async (user: any) => {
    const { _id } = user
    const issuedAt = moment().utc(true).valueOf()
    const expiresIn = '1d'
    const expiresAt = calculateTokenExpiration(issuedAt, expiresIn)
    const payload = {
        sub: _id,
        iat: issuedAt,
    }
    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
        expiresIn: expiresIn,
        algorithm: 'RS256',
    })
    return {
        token: `${signedToken}`,
        expiresIn: expiresIn,
        expiresAt: expiresAt,
    }
}

export const validPassword = (password: string, hash: string, salt: string) => {
    const verify = crypto
        .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
        .toString('hex')
    return hash === verify
}
