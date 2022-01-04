// import redis, { RedisClient } from 'redis'
// import { promisify } from 'util'
// import { config } from 'dotenv'

// import {
//     DEVELOPMENT,
//     PRODUCTION,
//     REDIS_PRODUCTION_OPTIONS,
//     REDIS_DEVELOPMENT_OPTIONS,
// } from '../constants'

// config()

// let client!: RedisClient

// if (process.env.NODE_ENV === DEVELOPMENT) {
//     client = redis.createClient(REDIS_DEVELOPMENT_OPTIONS) as RedisClient
// } else if (process.env.NODE_ENV === PRODUCTION) {
//     client = redis.createClient(REDIS_PRODUCTION_OPTIONS) as RedisClient
// }

// export const getAsync = promisify(client.get).bind(client)
// export const setAsync = promisify(client.set).bind(client)
// export const setExAsync = promisify(client.setex).bind(client)
// export const appendAsync = promisify(client.append).bind(client)
