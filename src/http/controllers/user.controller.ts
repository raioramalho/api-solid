import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { userService } from '../services'
import { StatusCodes } from 'http-status-codes'

interface CreateUserDto {
  name: string
  email: string
  password: string
}
export class UserController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string().min(6),
    })
    const data: CreateUserDto = registerBodySchema.parse(request.body)

    try {
      const newUser = await userService.create(data)
      return reply.status(StatusCodes.CREATED).send(newUser)
    } catch (error: any) {
      return reply.status(error?.code).send({
        message: error?.message,
      })
    }
  }

  async select(request: FastifyRequest, reply: FastifyReply) {
    const { id }: any = request.params
    try {
      return reply
        .status(StatusCodes.OK)
        .send(await userService.selectById(+id))
    } catch (error: any) {
      return reply.status(error?.code).send({
        message: error?.message,
      })
    }
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const { id }: any = request.params
    const data: any = request.body

    try {
      const updateUser = await userService.update(+id, data)
      return reply.status(StatusCodes.ACCEPTED).send(updateUser)
    } catch (error: any) {
      return reply.status(error?.code).send({
        message: error?.message,
      })
    }
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const { id }: any = request.params
    try {
      const deleteUser = await userService.delete(+id)
      return reply.status(StatusCodes.ACCEPTED).send(deleteUser)
    } catch (error: any) {
      return reply.status(error?.code).send({
        message: error?.message,
      })
    }
  }
}
