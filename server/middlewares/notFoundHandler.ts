import * as HttpStatus from 'http-status'
import { Request, Response } from 'express'

/**
 * Error response middleware for 404 not found.
 *
 * @param  {Request} req
 * @param  {Response} res
 * @returns <void>
 */
export default function notFoundError(
  req: Request,
  res: Response,
): void {
  res.status(HttpStatus.NOT_FOUND).json({
    error: {
      code: HttpStatus.NOT_FOUND,
      message: 'Resource not found.'
    }
  })
}