import { env } from '@/env'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { RegisterUser } from '../@types/registerUser'
import { userRepositories } from '@/repositories'

export class RegisterService {
  async create(payload: RegisterUser) {
    const verify = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    })

    if (verify) {
      throw new Error(`This email already exist!`)
    }

    const password_hash = await hash(payload.password, env.PASS_SALT)

    return await userRepositories.create({
      name: payload.name,
      email: payload.email,
      password_hash,
    })
  }
}
