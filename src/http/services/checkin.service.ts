import { checkInRepositorie } from '@/repositories'
import { Prisma } from '@prisma/client'

export class CheckInService {
  async create({ user_id }: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await checkInRepositorie.create({
      user_id,
    })

    return checkIn
  }
}
