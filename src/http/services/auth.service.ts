import { CustomError } from '../@types/custom.error'
import { errorHelper } from '../helpers'
import { compare } from 'bcryptjs'
import { userRepositorie } from '@/repositories'
import { User } from '@prisma/client'

interface IAuthData {
  email: string
  password: string
}

export class AuthService {
  async execute({ email, password }: IAuthData): Promise<User> {
    const verify = await userRepositorie.selectByEmail(email)
    if (!verify) {
      throw new CustomError(
        errorHelper.userNotValid().message,
        errorHelper.userNotValid().code,
      )
    }

    const isPasswordMatch = await compare(password, verify.password_hash)

    if (!isPasswordMatch) {
      throw new CustomError(
        errorHelper.userNotValid().message,
        errorHelper.userNotValid().code,
      )
    }

    verify.password_hash = ''
    return verify
  }
}
