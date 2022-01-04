import { Router } from 'express'
//import { authenticate } from 'passport'

import { customerController, userController } from '../controllers'

const router = Router()

router.route('/').get().post(customerController.customerRegister)
router.post('/login', userController.userLogin)

export default router
