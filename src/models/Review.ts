import { Schema, SchemaTypes, model } from 'mongoose'
//import validator from 'validator'

import { collections, models } from '../constants'

import { Review as IReview } from '../types'

const Review: Schema = new Schema(
    {
        customer: {
            type: SchemaTypes.ObjectId,
            required: true,
            ref: models.customer,
            //validate: validator.isMongoId,
        },
        product: {
            type: SchemaTypes.ObjectId,
            required: true,
            ref: models.product,
            //validate: validator.isMongoId,
        },
        rating: {
            type: SchemaTypes.Number,
            required: true,
            min: 1,
            max: 5,
            //validate: validator.isInt,
        },
        text: {
            type: SchemaTypes.String,
            required: true,
            maxlength: 255,
            trim: true,
        },
    },
    { timestamps: true, collection: collections.review }
)

export default model<IReview>(models.review, Review)
