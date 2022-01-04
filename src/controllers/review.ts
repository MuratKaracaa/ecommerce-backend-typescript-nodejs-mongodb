import { Request, Response } from 'express'

import { APIFeatures } from '../utils'

import Review from '../models/Review'

export const getAllReviews = async (request: Request, response: Response) => {
    try {
        const API = new APIFeatures(Review.find(), request.query)
            .filter()
            .sort()
            .limitFields()
            .paginate()
        const result = await API.query
        return response.status(200).json({
            status: 'OK',
            count: result.length,
            products: result,
        })
    } catch (error) {
        return response.status(500).json(error)
    }
}

export const createReview = async (request: Request, response: Response) => {
    const customer = request.user?.customerProfile[0]._id
    try {
        const { product, rating, text } = request.body
        const newReview = await new Review({
            customer,
            product,
            rating,
            text,
        }).save()
        return response.status(200).json({
            status: 'OK',
            newReview,
        })
    } catch (error) {
        return response.status(500).json(error)
    }
}
