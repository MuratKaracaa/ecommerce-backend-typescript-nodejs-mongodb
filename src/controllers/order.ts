import { Request, Response } from 'express'

import { unauthorized } from '../constants'
import { APIFeatures, generateOrderCode } from '../utils'

import Order from '../models/Order'

export const createOrder = async (request: Request, response: Response) => {
    const {
        butik,
        product,
        deliveryAddress,
        firstName,
        lastName,
        orderedAmount,
        orderSum,
    } = request.body
    const customer = request.user!.customerProfile[0]!
    const orderCode = generateOrderCode()
    try {
        await new Order({
            customer,
            butik,
            product,
            firstName,
            lastName,
            orderedAmount,
            orderSum,
            deliveryAddress,
            orderCode,
        }).save()
        return response.status(200).json({
            message: 'Sipariş başarıyla alındı.',
        })
    } catch (error) {
        return response.status(500).json(error)
    }
}

export const listOrders = async (request: Request, response: Response) => {
    try {
        const API = new APIFeatures(Order.find(), request.query)
            .filter()
            .sort()
            .limitFields()
            .paginate()
        const result: [] = await API.query
        return response.status(200).json({
            status: 'OK',
            count: result.length,
            products: result,
        })
    } catch (error) {
        return response.status(500).json(error)
    }
}

export const deleteOrder = async (request: Request, response: Response) => {
    const { _id } = request.params
    const tokenUser = request.user!.customerProfile[0]._id
    try {
        const orderToDelete = await Order.findById(_id).orFail()
        const { outForDelivery, customer } = orderToDelete
        const isOwner = JSON.stringify(tokenUser) === JSON.stringify(customer)
        if (!isOwner) {
            return response.status(401).json({
                message: unauthorized,
            })
        } else if (outForDelivery) {
            return response.status(200).json({
                message: 'Teslimata çıkan siparişler iptal edilemez',
            })
        } else {
            await orderToDelete?.deleteOne()
            return response.status(200).json({
                message: 'Sipariş başarıyla silindi.',
            })
        }
    } catch (error) {
        return response.status(500).json(error)
    }
}

export const updateOrder = async (request: Request, response: Response) => {
    const { _id } = request.params
    const { deliveryAddress } = request.body
    const tokenUser = request.user!.customerProfile[0]._id
    try {
        const orderToUpdate = await Order.findById(_id).orFail()
        const { approvedByButik, customer } = orderToUpdate
        const isOwner = JSON.stringify(tokenUser) === JSON.stringify(customer)
        if (!isOwner) {
            return response.status(401).json({
                message: unauthorized,
            })
        } else if (approvedByButik) {
            return response.status(200).json({
                message:
                    'Siparişiniz butik tarafından onaylanmıştır. Onaylandıktan sonra adres değişikliği için butikle irtibata geçin.',
            })
        } else {
            if (deliveryAddress) {
                await orderToUpdate?.updateOne({ deliveryAddress })
            }
            return response.status(200).json({
                message: 'Sipariş başarıyla güncellendi.',
            })
        }
    } catch (error) {
        return response.status(200).json(error)
    }
}

export const orderApprovalChange = async (
    request: Request,
    response: Response
) => {
    const { _id } = request.params
    const tokenUser = request.user!.butikProfile[0]._id
    const { approvedByButik } = request.body
    try {
        const orderToUpdate = await Order.findById(_id).orFail()
        const { butik } = orderToUpdate
        const isOwner = JSON.stringify(tokenUser) === JSON.stringify(butik)
        if (!isOwner) {
            return response.status(401).json({
                message: unauthorized,
            })
        } else {
            await orderToUpdate?.updateOne({
                approvedByButik,
            })
            return response.status(200).json({
                message: 'Sipariş başarıyla onaylandı.',
            })
        }
    } catch (error) {
        return response.status(200).json(error)
    }
}

export const outForDeliveryChange = async (
    request: Request,
    response: Response
) => {
    const { _id } = request.params
    const tokenUser = request.user!.butikProfile[0]._id
    const { outForDelivery, trackingNumber } = request.body
    try {
        const orderToUpdate = await Order.findById(_id).orFail()
        const { approvedByButik, butik } = orderToUpdate
        const isOwner = JSON.stringify(tokenUser) === JSON.stringify(butik)
        if (!isOwner) {
            return response.status(401).json({
                message: unauthorized,
            })
        } else if (!approvedByButik) {
            return response.status(200).json({
                message: 'Sipariş onaylanmadan kargoya çıkarılamaz',
            })
        } else {
            await orderToUpdate?.updateOne({
                outForDelivery,
                trackingNumber,
            })
            return response.status(200).json({
                message: 'Kargo numarası ve durumu başarıyla güncellendi.',
            })
        }
    } catch (error) {
        return response.status(200).json(error)
    }
}
