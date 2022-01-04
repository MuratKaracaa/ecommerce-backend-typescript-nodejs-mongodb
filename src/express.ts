import { User as IUser } from './types'

declare global {
    namespace Express {
        interface User extends IUser {}
    }
}

export {}
