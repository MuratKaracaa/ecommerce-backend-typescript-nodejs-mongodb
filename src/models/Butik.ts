import { Schema, SchemaTypes, model } from 'mongoose'
import slugify from 'slugify'

import { butikProfile as IButik } from '../types'

import { models, collections, clickSchema } from '../constants'

const Butik: Schema = new Schema(
    {
        profileOf: {
            type: SchemaTypes.ObjectId,
            ref: models.user,
        },
        butikName: {
            type: SchemaTypes.String,
            required: true,
            trim: true,
        },
        butikSlug: {
            type: SchemaTypes.String,
            required: false,
            unique: true,
        },
        butikImage: {
            type: SchemaTypes.String,
            required: false,
            trim: true,
        },
        visits: [clickSchema],
    },
    {
        timestamps: true,
        collection: collections.butik,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)

Butik.virtual('products', {
    ref: models.product,
    foreignField: 'butik',
    localField: '_id',
})

Butik.virtual('orders', {
    ref: models.order,
    foreignField: 'butik',
    localField: '_id',
})

Butik.pre('save', function (next) {
    this.butik_slug = slugify(this.butik_name, { lower: true })
    next()
})

export default model<IButik>(models.butik, Butik)
