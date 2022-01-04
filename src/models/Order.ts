import { Schema, SchemaTypes, model } from 'mongoose'
import validator from 'validator'

import { Order as IOrder } from '../types'

import { models, collections } from '../constants'

const Order = new Schema(
    {
        customer: {
            type: SchemaTypes.ObjectId,
            required: true,
            ref: models.customer,
        },
        product: {
            type: SchemaTypes.ObjectId,
            required: true,
            ref: models.product,
        },
        butik: {
            type: SchemaTypes.ObjectId,
            required: true,
            ref: models.butik,
        },
        orderedAmount: {
            type: SchemaTypes.Number,
            required: true,
            min: 1,
            max: 5,
        },
        orderSum: {
            type: SchemaTypes.Number,
            required: true,
            min: 1,
        },
        firsName: {
            type: SchemaTypes.String,
            required: true,
            trim: true,
            maxlength: 20,
        },
        lastName: {
            type: SchemaTypes.String,
            required: true,
            trim: true,
            maxlength: 20,
        },
        deliveryAddress: {
            type: SchemaTypes.String,
            required: true,
            maxlength: 255,
            minlength: 10,
        },
        approvedByButik: {
            type: SchemaTypes.Boolean,
            default: false,
        },
        outForDelivery: {
            type: SchemaTypes.Boolean,
            default: false,
        },
        orderCode: {
            type: SchemaTypes.String,
            required: true,
            minlength: 8,
            validate: validator.isAlphanumeric,
        },
        trackingNumber: {
            type: SchemaTypes.String,
            required: false,
            default: null,
        },
    },
    {
        timestamps: true,
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
        collection: collections.order,
    }
)

export default model<IOrder>(models.order, Order)
