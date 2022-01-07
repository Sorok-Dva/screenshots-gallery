import { User } from '../orm/entities/User'

export type TokenType =
  | 'access'
  | 'email_validation'
  | 'reset_password'

export type TokenKind =
  | 'admin'
  | 'user'

declare global {
  namespace Express {
    interface Request {
      authToken?: {
        type: TokenType
        sub: string
        iat: number
        exp: number
        [attr: string]: string | number | boolean
      }
      user?: User
    }
  }
}