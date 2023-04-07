import { describe, expect, it } from 'vitest'
import { User } from '@prisma/client'
import { compare } from 'bcryptjs'
import { userService } from '.'
import { prisma } from '@/lib/prisma'

describe('UserService Use Cases', async () => {
  await prisma.user.deleteMany({
    where: {
      name: {
        startsWith: 'test',
      },
    },
  })
  it('Should hash use password upon registration', async () => {
    const newUser: User = await userService.create({
      name: 'test-user',
      email: 'test-user@gmail.com',
      password: '1q2w3e',
    })
    expect(newUser.id).toEqual(expect.any(Number))
    expect(newUser.name).toEqual(expect.any(String))
    expect(newUser.email).toEqual(expect.any(String))
    expect(newUser.password_hash).toEqual(expect.any(String))
    expect(await compare('1q2w3e', newUser.password_hash)).toBe(true)
  })

  it('Should not be possible register with same email', async () => {
    expect(
      async () =>
        await userService.create({
          name: 'test-user',
          email: 'test-user@gmail.com',
          password: '1q2w3e',
        }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('Should be possible get user by EMAIL and ID', async () => {
    const selectByEmail: any = await userService.selectByEmail(
      'test-user@gmail.com',
    )
    expect(selectByEmail?.email).toBe('test-user@gmail.com')

    const selectById = await userService.selectById(selectByEmail?.id)
    expect(selectById?.id).toBe(selectByEmail.id)
  })
})
