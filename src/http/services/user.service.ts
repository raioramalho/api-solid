import { env } from '@/env'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { userRepositorie } from '@/repositories'
import { errorHelper } from '@/http/helpers'
import { CustomError } from '@/http/helpers/custom.error'

export class UserService {
  async create(payload: any) {
    const verify = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    })

    if (verify) {
      throw new CustomError(
        errorHelper.userAreadyExists().message,
        errorHelper.userAreadyExists().code,
      )
    }

    const password_hash = await hash(payload.password, env.PASS_SALT)

    return await userRepositorie.create({
      name: payload.name,
      email: payload.email,
      password_hash,
    })
  }

  async selectById(id: number) {
    const verify = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!verify) {
      throw new CustomError(
        errorHelper.userNotFound().message,
        errorHelper.userNotFound().code,
      )
    }

    return await userRepositorie.selectById(id)
  }

  async selectByEmail(email: string) {
    const verify = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!verify) {
      throw new CustomError(
        errorHelper.userNotFound().message,
        errorHelper.userNotFound().code,
      )
    }

    return await userRepositorie.selectByEmail(email)
  }

  async update(id: number, payload: any) {
    const verify = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!verify) {
      throw new CustomError(
        errorHelper.userNotFound().message,
        errorHelper.userNotFound().code,
      )
    }

    return await userRepositorie.update(id, payload)
  }

  async delete(id: number) {
    const verify = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!verify) {
      throw new CustomError(
        errorHelper.userNotFound().message,
        errorHelper.userNotFound().code,
      )
    }

    return await userRepositorie.delete(id)
  }
}
