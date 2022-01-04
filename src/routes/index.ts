import { Router } from 'express'

import butikRouter from './butik'

import productRouter from './product'
import reviewRouter from './review'
import customerRouter from './customer'
import orderRouter from './order'

import { rateLimiter } from '../utils'

const router = Router()

router.use('/api', rateLimiter)
router.use('/api/butik', butikRouter)
router.use('/api/product', productRouter)
router.use('/api/review', reviewRouter)
router.use('/api/customer', customerRouter)
router.use('/api/order', orderRouter)

export default router
