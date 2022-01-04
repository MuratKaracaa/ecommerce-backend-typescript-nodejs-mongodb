import { join } from 'path'
import { ClientOpts } from 'redis'
import { SchemaTypes, SchemaDefinitionProperty, Types } from 'mongoose'

export const roles = {
    customer: 'Müşteri',
    admin: 'Admin',
    butik: 'Butik',
}

export const models = {
    banner: 'Banner',
    butik: 'ButikProfile',
    category: 'Category',
    customer: 'CustomerProfile',
    homeProduct: 'HomeProduct',
    product: 'Product',
    review: 'Review',
    user: 'User',
    order: 'Order',
}

export const collections = {
    banner: 'Logolar',
    homeProduct: 'Ev Ürünleri',
    product: 'Ürünler',
    user: 'Kullanıcılar',
    butik: 'Butik Profilleri',
    customer: 'Müşteri Profilleri',
    review: 'Değerlendirmeler',
    order: 'Siparişler',
}

export const unauthorized = 'You are not authorized to perform this action.'

export const privateKeyPath = join(__dirname, '..', 'secret', 'PRIV_KEY.pem')
export const publicKeyPath = join(__dirname, '..', 'secret', 'PUB_KEY.pem')
export const DEVELOPMENT = 'DEVELOPMENT'
export const PRODUCTION = 'PRODUCTION'
export const LOCAL_HOST = 'localhost'
export const REDIS_CLIENT = 'server-redis'
export const REDIS_DEVELOPMENT_OPTIONS = {
    host: LOCAL_HOST,
    port: 6379,
} as ClientOpts
export const REDIS_PRODUCTION_OPTIONS = {
    host: REDIS_CLIENT,
    port: 6379,
} as ClientOpts
export const clickSchema = {
    date: SchemaTypes.String,
    day: SchemaTypes.String,
    month: SchemaTypes.String,
    count: SchemaTypes.Number,
} as SchemaDefinitionProperty

export const guestUser = new Types.ObjectId()
