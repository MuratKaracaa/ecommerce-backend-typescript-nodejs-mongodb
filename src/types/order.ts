import { ObjectId, Document } from 'mongoose'
import { butikProfile, customerProfile, Product } from '.'

export interface Order extends Document {
    customer: ObjectId | customerProfile
    butik: ObjectId | butikProfile
    product: ObjectId | Product
    orderedAmount: number
    orderSum: number
    firstName: string
    lastName: string
    approvedByButik: boolean
    deliveryAddress: string
    outForDelivery: boolean
    orderCode: string
    trackingNumber: string
}

export type orders = Order[]
