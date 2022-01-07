/*
import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import userService from '@services/users.service';

class UsersController {
  public userService = new userService();

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: User[] = await this.userService.findAllUser();

      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.id);
      const findOneUserData: User = await this.userService.findUserById(userId);

      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const createUserData: User = await this.userService.createUser(userData);

      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.id);
      const userData: CreateUserDto = req.body;
      const updateUserData: User = await this.userService.updateUser(userId, userData);

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.id);
      const deleteUserData: User = await this.userService.deleteUser(userId);

      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
*/

import { Request, Response, NextFunction, Router } from 'express'
import * as HttpStatus from 'http-status'

const router : Router = Router()

/**
 * Handle / GET request, responds API information.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<Response>}
 */
const login = async (req : Request, res : Response, next : NextFunction) : Promise<Response | void> => {
  try {
    
    res.setHeader('Set-Cookie', [])
    
    return res.status(200)
      .json({ data: { user: {} }, message: 'login' })
  } catch (error) {
    return next(error)
  }
}
router.post('/login', login)

/**
 * Handle / GET request, responds API information.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {void}
 */
const signup = async (req : Request, res : Response, next : NextFunction) : Promise<Response | void> => {
  try {
    return res.status(201).json({ data: {}, message: 'signup' })
  } catch (error) {
    next(error)
  }
}
router.post('/signup', signup)

const logOut = async (req : Request, res : Response, next : NextFunction) => {
  try {
    res.setHeader('Set-Cookie', ['Authorization=; Max-age=0'])
    res.status(200).json({ data: {}, message: 'logout' })
  } catch (error) {
    next(error)
  }
}
router.get('/logout', signup)

export default router

