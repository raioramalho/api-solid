import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export class CheckInRepositorie {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const make = await prisma.checkIn.create({
      data,
    })

    return make
  }

  async selectById(id: number) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id,
      },
    })
    return checkIn
  }

  async selectByUserId(id: number) {
    const checkIn = await prisma.checkIn.findMany({
      where: { user_id: id },
    })

    return checkIn
  }

  async selectByUserEmail(email: string) {
    const checkIn = await prisma.checkIn.findMany({
      where: { user: { email } },
    })

    return checkIn
  }

  async update(id: number, data: Prisma.CheckInUpdateInput) {
    const checkIn = await prisma.checkIn.update({
      where: { id },
      data,
    })

    return checkIn
  }

  async delete(id: number) {
    const checkIn = await prisma.checkIn.delete({
      where: {
        id,
      },
    })

    return checkIn
  }
}
