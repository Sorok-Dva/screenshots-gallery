import { Router } from 'express'

import homeController from './controllers/home.controller'
import galleryController from './controllers/gallery.controller'
import screenController from './controllers/screen.controller'
import userController from './controllers/users.controller'

const router: Router = Router()

router.use('/', homeController)
router.use('/screens', screenController)
router.use('/gallery', galleryController)
router.use('/user', userController)


export default router