import { describe, expect, it } from 'vitest'
import { User } from '@prisma/client'
import { compare } from 'bcryptjs'
import { userService } from '.'
import { prisma } from '@/lib/prisma'
import { CustomError } from '../@types/custom.error'

describe('UserService Use Cases', async () => {
  await prisma.user.deleteMany({
    where: {
      email: {
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
    ).rejects.toBeInstanceOf(CustomError)
  })

  it('Should be possible get user by EMAIL and ID', async () => {
    const selectByEmail: any = await userService.selectByEmail(
      'test-user@gmail.com',
    )
    expect(selectByEmail?.email).toBe('test-user@gmail.com')

    const selectById = await userService.selectById(selectByEmail?.id)
    expect(selectById?.id).toBe(selectByEmail.id)
  })

  it('Should be possbile update user by ID', async () => {
    const selectByEmail: any = await userService.selectByEmail(
      'test-user@gmail.com',
    )

    const updateUser = await userService.update(selectByEmail.id, {
      name: 'Alan',
      password_hash: 'NovaSenha',
    })

    expect(updateUser.name).toBe('Alan')
    expect(await compare('NovaSenha', updateUser.password_hash)).toBe(true)
  })

  it('Should be possible delete user by ID', async () => {
    const selectByEmail: any = await userService.selectByEmail(
      'test-user@gmail.com',
    )
    expect((await userService.delete(selectByEmail?.id)).email).toBe(
      'test-user@gmail.com',
    )
    expect(
      async () => await userService.selectById(selectByEmail.id),
    ).rejects.toBeInstanceOf(CustomError)
  })
})
