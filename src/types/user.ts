import { ObjectId, Document } from 'mongoose'

import { clicks, orders, products, reviews } from '.'

export interface butikProfile extends Document {
    _id: ObjectId
    profileOf: ObjectId
    butikName: string
    butikImage: string
    butikSlug: string
    orders: orders
    products: products
    visits: clicks
}

export interface customerProfile extends Document {
    _id: ObjectId
    profileOf: ObjectId
    orders: orders
    reviews: reviews
}

export interface User {
    username: string
    email: string
    role: string
    phone: number
    customerProfile: customerProfile[]
    butikProfile: butikProfile[]
    hash: string
    salt: string
}

export type users = User[]
