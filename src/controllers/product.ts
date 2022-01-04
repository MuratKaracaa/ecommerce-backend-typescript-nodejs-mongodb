import { Request, Response } from 'express'

import { unauthorized } from '../constants'
import {
    APIFeatures,
    click,
    filterClicksByDate,
    transformToDate,
} from '../utils'

import Product from '../models/Product'

export const listProducts = async (request: Request, response: Response) => {
    try {
        const API = new APIFeatures(Product.find(), request.query)
            .filter()
            .sort()
            .limitFields()
            .paginate()
        const result = await API.query
        return response.status(200).json({
            count: result.length,
            products: result,
        })
    } catch (error) {
        return response.status(500).json(error)
    }
}

export const addProduct = async (request: Request, response: Response) => {
    const { butikProfile } = request.user!
    const { _id } = butikProfile[0]
    const {
        title,
        description,
        price,
        image,
        discountPrice,
        category,
        gender,
        images,
        sizes,
        colors,
    } = request.body
    try {
        await new Product({
            title,
            description,
            price,
            discountPrice,
            image,
            category,
            gender,
            butik: _id,
            images,
            sizes,
            colors,
        }).save()

        return response.status(200).json({
            message: 'Yeni ürün eklendi',
        })
    } catch (error) {
        return response.status(500).json(error)
    }
}

export const updateProductById = async (
    request: Request,
    response: Response
) => {
    const { productId } = request.params
    const { butikProfile }: any = request.user
    const { _id } = butikProfile![0]
    const update = request.body
    try {
        const product = await Product.findById(productId).orFail()
        const { butik } = product
        const isOwner = JSON.stringify(_id) == JSON.stringify(butik)
        if (!isOwner) return response.status(401).json(unauthorized)
        await product.update(update, { new: true }).orFail()
        return response
            .status(200)
            .json({ message: 'Güncelleme işlemi başarı ile gerçekleşti.' })
    } catch (error) {
        return response.status(500).json(error)
    }
}

export const deleteProductById = async (
    request: Request,
    response: Response
) => {
    const { productId } = request.params
    const { butikProfile }: any = request.user
    const { _id }: any = butikProfile[0]
    try {
        const product = await Product.findById(productId).orFail()
        const { butik } = product
        const isOwner = JSON.stringify(_id) == JSON.stringify(butik)
        if (!isOwner) return response.status(401).json(unauthorized)
        await product.deleteOne()
        return response
            .status(200)
            .json({ message: 'Silme işlemi başarıyla gerçekleşti' })
    } catch (error) {
        return response.status(500).json(error)
    }
}

export const getProductById = async (request: Request, response: Response) => {
    const { productId } = request.params
    const { reviews } = request.query
    try {
        const product = Product.findById(productId).orFail()
        if (Boolean(reviews) === true) {
            await product.populate('reviews')
        }
        return response.status(200).json({
            product,
        })
    } catch (error) {
        return response.status(500).json(error)
    }
}

export const productClick = async (request: Request, response: Response) => {
    const { productId, field } = request.params
    try {
        await click(Product, productId, field)
        return response.status(200).json({
            message: 'Stat başarıyla kaydedildi.',
        })
    } catch (error) {
        return response.status(500).json(error)
    }
}

export const getClickStats = async (request: Request, response: Response) => {
    const { productId } = request.params
    const { field } = request.params
    const { last, start, end }: any = request.query
    let lastAsDate
    try {
        const { [field]: f }: any = await Product.findById(productId).select(
            field
        )
        if (last) {
            lastAsDate = transformToDate(last)
        }
        const result = filterClicksByDate(f, lastAsDate, start, end)

        return response.status(200).json(result)
    } catch (error) {
        return response.status(500).json(error)
    }
}
