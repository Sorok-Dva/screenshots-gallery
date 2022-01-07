import { Router } from 'express'

import * as screenController from './screen.controller'

const router : Router = Router()

router.get('/-:key', screenController.get)

export default router
