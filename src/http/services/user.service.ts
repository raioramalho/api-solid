import { env } from '@/env'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { CreateUser } from '../@types/createUser'
import { userRepositories } from '@/repositories'

export class UserService {
  async create(payload: CreateUser) {
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
