import { env } from '@/env'
import { hash } from 'bcryptjs'
import { userRepositorie } from '@/repositories'
import { errorHelper } from '@/http/helpers'
import { CustomError } from '@/http/@types/custom.error'

export class UserService {
  async create(payload: any) {
    const verify = await userRepositorie.selectByEmail(payload.email)

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
    const verify = await userRepositorie.selectById(id)

    if (!verify) {
      throw new CustomError(
        errorHelper.userNotFound().message,
        errorHelper.userNotFound().code,
      )
    }

    return await userRepositorie.selectById(id)
  }

  async selectByEmail(email: string) {
    const verify = await userRepositorie.selectByEmail(email)

    if (!verify) {
      throw new CustomError(
        errorHelper.userNotFound().message,
        errorHelper.userNotFound().code,
      )
    }

    return await userRepositorie.selectByEmail(email)
  }

  async update(id: number, payload: any) {
    const verify = await userRepositorie.selectById(id)

    if (!verify) {
      throw new CustomError(
        errorHelper.userNotFound().message,
        errorHelper.userNotFound().code,
      )
    }
    payload.password_hash = await hash(payload.password_hash, env.PASS_SALT)
    return await userRepositorie.update(id, payload)
  }

  async delete(id: number) {
    const verify = await userRepositorie.selectById(id)

    if (!verify) {
      throw new CustomError(
        errorHelper.userNotFound().message,
        errorHelper.userNotFound().code,
      )
    }

    return await userRepositorie.delete(id)
  }
}
