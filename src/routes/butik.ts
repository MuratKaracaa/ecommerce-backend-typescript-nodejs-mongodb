import { Router } from 'express'
import passport from 'passport'

import { butikController, userController } from '../controllers'
import { restrictByRole } from '../middlewares/restrictByRole'
import { roles } from '../constants'

const router = Router()

router.post('/login', userController.userLogin)
router.post('/register', butikController.butikRegister)

router.get('/', butikController.listButiks)
router.get('/:butikId', butikController.getButik)
router.get('/:butikId/products', butikController.listButikProductsById)
router.get(
    '/b/products',
    passport.authenticate('jwt', { session: false }),
    butikController.listButikProducts
)

router.get(
    '/b/homestats',
    passport.authenticate('jwt', { session: false }),
    restrictByRole(roles.butik),
    butikController.homeStats
)

router.put('/:butikId/click/:field', butikController.butikVisit)

export default router
