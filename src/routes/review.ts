import { Router } from 'express'
import passport from 'passport'
import { roles } from '../constants'

import { reviewContoller } from '../controllers'
import { restrictByRole } from '../middlewares/restrictByRole'

const router = Router()

router
    .route('/')
    .get(reviewContoller.getAllReviews)
    .post(
        passport.authenticate('jwt', { session: false }),
        restrictByRole(roles.customer),
        reviewContoller.createReview
    )

export default router
