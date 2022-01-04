import { Request, Response } from 'express'

import { generateSaltAndHash } from '../utils'
import { roles } from '../constants'
//import { APIFeatures } from '../utils/ApiFeatures'

import Customer from '../models/Customer'
import User from '../models/User'

export const customerRegister = async (
    request: Request,
    response: Response
) => {
    const { username, password, email, phone } = request.body
    const { salt, hash } = generateSaltAndHash(password)
    try {
        const { _id } = await new User({
            username,
            email,
            salt,
            hash,
            phone,
            role: roles.customer,
        }).save()
        const customer = await new Customer({
            profileOf: _id,
        }).save()
        return response.status(200).json({
            message: 'Yeni Müşteri eklendi.',
            data: customer,
        })
    } catch (error) {
        return response.status(500).json(error)
    }
}
