import { DEVELOPMENT, PRODUCTION, LOCAL_HOST, REDIS_CLIENT } from './constants'

type DEVELOPMENT = string
type PRODUCTION = string
type LOCAL_HOST = string
type REDIS_CLIENT = string

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: DEVELOPMENT | PRODUCTION
            PORT?: number
            DATABASE_URL_PRODUCTION: string
            DATABASE_URL_DEVELOPMENT: string
            BASE_URL_DEVELOPMENT: string
            BASE_URL_PRODUCTION: string
            REDIS_HOST_DEVELOPMENT: LOCAL_HOST
            REDIS_HOST_PRODUCTION: REDIS_CLIENT
        }
    }
}

export {}
