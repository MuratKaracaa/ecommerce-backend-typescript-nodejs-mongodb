import { ObjectId, Document } from 'mongoose'

interface Size {
    sizeTitle: string
}

type sizes = Size[]

interface Color {
    colorTitle: string
    colorTode: string
}

type colors = Color[]

interface ClickObj {
    date: string
    day: string
    month: string
    count: number
}
export type clicks = ClickObj[]

export interface Review extends Document {
    user: ObjectId
    product: ObjectId
    rating: number
    text: string
}

export type reviews = Review[]

export interface ClickFields {
    clicks: clicks
    whatsappClicks: clicks
    instagramClicks: clicks
}

export type clickFields = keyof ClickFields

export interface Product extends Document, ClickFields {
    title: string
    description: string
    slug: string
    price: number
    discountPrice: number
    image: string
    category: string
    gender: string
    butik: ObjectId
    sizes: sizes
    colors: colors
    reviews: reviews
    ratingsAverage: number
}

export type products = Product[]
