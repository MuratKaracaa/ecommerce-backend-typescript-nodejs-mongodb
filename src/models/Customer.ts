import { Schema, SchemaTypes, model } from 'mongoose'

import { customerProfile as ICustomer } from '../types'

import { collections, models } from '../constants'

const Customer: Schema = new Schema(
    {
        profileOf: {
            type: SchemaTypes.ObjectId,
            ref: models.user,
        },
        customerImage: {
            type: SchemaTypes.String,
            required: false,
            trim: true,
        },
    },
    {
        timestamps: true,
        collection: collections.customer,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)

Customer.virtual('orders', {
    ref: models.order,
    foreignField: 'customer',
    localField: '_id',
})

Customer.virtual('reviews', {
    ref: models.customer,
    foreignField: 'customer',
    localField: '_id',
})

export default model<ICustomer>(models.customer, Customer)
