//@ts-nocheck

import { Schema, SchemaTypes, model } from 'mongoose'
import slugify from 'slugify'

import { collections, models, clickSchema } from '../constants'

import { Product as IProduct } from '../types'

const Product: Schema = new Schema(
    {
        title: {
            type: SchemaTypes.String,
            required: true,
            maxlength: 50,
            trim: true,
        },
        description: {
            type: SchemaTypes.String,
            required: true,
            maxlength: 255,
            trim: true,
        },
        slug: {
            type: SchemaTypes.String,
            required: false,
        },
        price: {
            type: SchemaTypes.Number,
            required: true,
            min: 1,
        },
        discountPrice: {
            type: SchemaTypes.Number,
            required: true,
            min: 1,
        },
        image: {
            type: SchemaTypes.String,
            required: true,
            maxlength: 2048,
            trim: true,
        },
        category: {
            type: SchemaTypes.String,
            required: true,
        },
        gender: {
            type: SchemaTypes.String,
            required: true,
            enum: ['erkek', 'kadın'],
        },
        butik: {
            type: SchemaTypes.ObjectId,
            ref: models.butik,
        },
        images: [
            {
                imageSlider: {
                    type: SchemaTypes.String,
                    required: true,
                    maxlength: 2048,
                },
            },
        ],
        sizes: [
            {
                sizeTitle: {
                    type: SchemaTypes.String,
                    enum: ['S', 'M', 'L', 'XS', 'XXS', 'XL', 'XXL'],
                },
            },
        ],
        colors: [
            {
                colorTitle: SchemaTypes.String,
                colorCode: SchemaTypes.String,
            },
        ],
        clicks: [
            {
                ...clickSchema,
            },
        ],
        whatsappClicks: [
            {
                ...clickSchema,
            },
        ],
        instagramClicks: [
            {
                ...clickSchema,
            },
        ],
    },
    {
        timestamps: true,
        collection: collections.product,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)

Product.pre('save', function (next) {
    this.slug = slugify(this.title, { lower: true })
    next()
})

Product.pre('save', function (next) {
    if (
        this.discountPrice < this.price &&
        this.discountPrice > 0 &&
        this.price > 0
    ) {
        next()
    } else {
        throw new Error('Invalid Price')
    }
})

Product.virtual('reviews', {
    ref: models.review,
    foreignField: 'product',
    localField: '_id',
})

Product.virtual('ratingsAverage').get(function () {
    if (this.reviews && this.reviews.length > 0) {
        let average =
            this.reviews.map((el) => el.rating).reduce((a, b) => a + b) /
            this.reviews.length
        return average
    } else {
        return 0
    }
})

export default model<IProduct>(models.product, Product)
