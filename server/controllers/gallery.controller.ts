import { Request, Response, Router } from 'express';
import * as HttpStatus from 'http-status';

const router: Router = Router()
/**
 * Handle / GET request, responds API information.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {void}
 */
export const get = (req: Request, res: Response): void => {
  res.status(HttpStatus.OK).json({
    images: [],
  })
}
router.post('/', get)

export default router
