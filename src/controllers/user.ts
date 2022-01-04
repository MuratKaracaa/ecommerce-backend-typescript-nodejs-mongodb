import { Request, Response } from 'express'

import { validPassword, issueToken } from '../utils'
import { roles } from '../constants'

import User from '../models/User'

export const userLogin = async (request: Request, response: Response) => {
    const { email, password, role } = request.body
    try {
        const user = await User.findOne({ email }).select('+salt +hash')
        let profile
        if (role === roles.butik) {
            await user?.populate('butikProfile')
            const { butik_name, butik_image } = user!.butikProfile[0]!
            profile = { butik_name, butik_image }
        } else if (role === roles.customer) {
            await user?.populate('customerProfile')
        }

        const { hash, salt } = user!
        const valid = validPassword(password, hash, salt)
        if (valid) {
            const { token, expiresIn, expiresAt } = await issueToken(user)
            return response.status(200).send({
                message: 'Hoşgeldiniz, sisteme giriş yapılıyor...',
                token,
                expiresIn,
                expiresAt,
                profile,
            })
        } else {
            return response.status(401).json({
                message: 'Şifreniz hatalı, lütfen tekrar deneyin.',
            })
        }
    } catch (error) {
        // BUGSNAG - SENTRY
        return response.status(500).json({
            message: 'Kullanıcı adını hatalı girdiniz.',
        })
    }
}
