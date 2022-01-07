import fs from 'fs'
import shortid from 'shortid'
import { NextFunction, Request, Response, Router } from 'express'
import * as HttpStatus from 'http-status';
import { screenHelper } from '../helpers'
import { HttpError } from '../errors'
import { getRepository } from 'typeorm';
import { Screen } from '../orm/entities/Screen'

const router: Router = Router()
/**
 * Handle / GET request, responds API information.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {void}
 */
export const save = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    if (req.body.size > 10485760) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Screenshot too large, limited to 10mo' })
    }
  
    const data = screenHelper.decodeBase64Image(req.body)
  
    if (data instanceof Error) return next(data)
  
    fs.writeFile(data.path, data.buffer, { encoding: 'base64' }, async err => {
      if (err) return next(new HttpError(HttpStatus.INTERNAL_SERVER_ERROR, err.message));
    
      const entity = new Screen()
  
      entity.uploadBy = req.user ? req.user.id : -1
      entity.private = req.body.privacy === 'private'
      entity.title = req.body.title || 'Untitled'
      entity.savedAsImg = true
      entity.path = data.path.replace('public', '')
      // screen.base64 = req.body.base64
      entity.shareKey = shortid.generate()
      entity.size = req.body.size
      entity.views = 0
    
      const screenRepository = getRepository(Screen);
      const screen = await screenRepository.save(entity)
      return res.status(200).json(screen)
    })
  } catch (error) {
    return next(error)
  }
}
router.post('/save', save)

/**
 * Handle / GET request, returns screen path.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {void}
 */
export const get = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  if (!req.params.key) return next(new Error('No key provided'));
  
  const screenRepository = getRepository(Screen)
  const screen = await screenRepository.findOne({ where: { shareKey: req.params.key } })
  if (!screen) return next(new Error('Screen not found'))
  if (screen.path === null && screen.deletedAt !== null) {
    return res.status(HttpStatus.OK).json({ redirect: '/' })
  }
  
  const viewScreenShot = async () => {
    screen.views += 1
    await screenRepository.save(screen)
    console.log(screen)
    return res.status(HttpStatus.OK).json({ screen })
  }
  
  if (screen.private === true) {
    if (req.user && req.user.id === screen.uploadBy) {
      return viewScreenShot()
    } else {
      return res.status(HttpStatus.OK).json({ redirect: '/' })
    }
  } else {
    return viewScreenShot();
  }
}
router.get('/:key', get)

export default router
