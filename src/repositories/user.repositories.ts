import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export class UserRepositories {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async update(id: number, data: Prisma.UserUpdateInput) {
    const user = await prisma.user.update({
      where: { id },
      data,
    })

    return user
  }

  async select(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
    })

    return user
  }

  async delete(id: number) {
    const user = await prisma.user.delete({
      where: { id },
    })

    return user
  }
}
