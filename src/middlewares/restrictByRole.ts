import { Request, Response, NextFunction } from 'express'

import { unauthorized } from '../constants'

export const restrictByRole = (...roles: String[]) => {
    return (request: Request, response: Response, next: NextFunction) => {
        const { role }: any = request.user!
        const notAllowedByRole = !roles.includes(role)
        if (notAllowedByRole) {
            return response.status(401).json({
                message: unauthorized,
            })
        } else {
            next()
        }
    }
}
