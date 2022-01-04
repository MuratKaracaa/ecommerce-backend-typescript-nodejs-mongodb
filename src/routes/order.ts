import { Router } from 'express'
import passport from 'passport'

import { orderController } from '../controllers'
import { restrictByRole } from '../middlewares/restrictByRole'
import { roles } from '../constants'

const router = Router()

router
    .route('/')
    .get(orderController.listOrders)
    .post(orderController.createOrder)

router.delete(
    '/:_id',
    passport.authenticate('jwt', { session: false }),
    restrictByRole(roles.customer),
    orderController.deleteOrder
)

router.put(
    '/:_id/approval',
    passport.authenticate('jwt', { session: false }),
    restrictByRole(roles.butik),
    orderController.orderApprovalChange
)

router.put(
    '/:_id/address',
    passport.authenticate('jwt', { session: false }),
    restrictByRole(roles.customer),
    orderController.updateOrder
)

router.put(
    '/:_id/delivery',
    passport.authenticate('jwt', { session: false }),
    restrictByRole(roles.butik),
    orderController.outForDeliveryChange
)

export default router
