import { Request, Response, NextFunction, Router } from 'express'
import * as HttpStatus from 'http-status'
import { CreateUserDto } from '@dtos/users.dto'
import { User } from '@interfaces/users.interface'
import { RequestWithUser } from '@interfaces/auth.interface'
import AuthService from '@services/auth.service'

const router : Router = Router()

/**
 * Handle / GET request, responds API information.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {void}
 */
const signup = async (req : Request, res : Response, next : NextFunction) : Promise<Response> => {
  try {
    const userData : CreateUserDto = req.body
    const signUpUserData : User = await this.authService.signup(userData)
    
    return res.status(201).json({ data: signUpUserData, message: 'signup' })
  } catch (error) {
    next(error)
  }
}
router.post('/signup', signup)

export default router
