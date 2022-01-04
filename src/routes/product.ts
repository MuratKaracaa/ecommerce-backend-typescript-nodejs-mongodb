import { Router } from 'express'
import passport from 'passport'

import { productController } from '../controllers'
import { restrictByRole } from '../middlewares/restrictByRole'

const router = Router()

router
    .route('/')
    .get(productController.listProducts)
    .post(
        passport.authenticate('jwt', { session: false }),
        restrictByRole('Butik'),
        productController.addProduct
    )

router
    .route('/:productId')
    .get(productController.getProductById)
    .put(
        passport.authenticate('jwt', { session: false }),
        productController.updateProductById
    )
    .delete(
        passport.authenticate('jwt', { session: false }),
        productController.deleteProductById
    )

router
    .route('/:productId/click/:field')
    .get(productController.getClickStats)
    .put(productController.productClick)

export default router
