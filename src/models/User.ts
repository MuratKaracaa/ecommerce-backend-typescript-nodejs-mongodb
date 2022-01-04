import { Schema, SchemaTypes, model } from 'mongoose'
import validator from 'validator'

import { collections, roles, models } from '../constants'

import { User as IUser } from '../types'

const User = new Schema(
    {
        username: {
            type: SchemaTypes.String,
            required: true,
            unique: true,
            trim: true,
            validate: validator.isAlphanumeric,
        },
        email: {
            type: SchemaTypes.String,
            required: true,
            unique: true,
            trim: true,
            validate: validator.isEmail,
        },
        hash: {
            type: SchemaTypes.String,
            required: true,
            select: false,
        },
        salt: {
            type: SchemaTypes.String,
            required: true,
            select: false,
        },
        role: {
            type: SchemaTypes.String,
            required: true,
            enum: [roles.admin, roles.butik, roles.customer],
        },
        phone: {
            type: SchemaTypes.String,
            required: true,
            trim: true,
            unique: true,
            validate: validator.isMobilePhone,
        },
    },
    {
        timestamps: true,
        collection: collections.user,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)

User.virtual('customerProfile', {
    ref: models.customer,
    foreignField: 'profileOf',
    localField: '_id',
})

User.virtual('butikProfile', {
    ref: models.butik,
    foreignField: 'profileOf',
    localField: '_id',
})

export default model<IUser>(models.user, User)
