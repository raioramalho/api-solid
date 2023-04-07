import { describe, expect, it } from 'vitest'
import { authService, userService } from '.'
import { prisma } from '@/lib/prisma'
import { CustomError } from '../@types/custom.error'

describe('AuthService Use Cases', async () => {
  await prisma.user.deleteMany({
    where: {
      email: {
        startsWith: 'test',
      },
    },
  })

  it('Should be able to authenticate', async () => {
    await userService.create({
      name: 'test-login',
      email: 'test-login@gmail.com',
      password: '1q2w3e',
    })

    const user = {
      email: 'test-login@gmail.com',
      password: '1q2w3e',
    }

    expect((await authService.execute(user)).name).toBe('test-login')
  })

  it('Should return unauthorized error', async () => {
    const user = {
      email: 'test-login@gmail.com',
      password: '1q2w3e5',
    }

    expect(async () => await authService.execute(user)).rejects.toBeInstanceOf(
      CustomError,
    )
  })
})
