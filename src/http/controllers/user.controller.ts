import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { userService } from '../services'

interface CreateUser {
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
    const data: CreateUser = registerBodySchema.parse(request.body)

    try {
      const newUser = await userService.create(data)
      return reply.status(201).send(newUser)
    } catch (error: any) {
      return reply.status(409).send({
        message: error?.message,
      })
    }
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const { id }: any = request.params
    const data: any = request.body

    try {
      const updateUser = await userService.update(+id, data)
      return reply.status(200).send(updateUser)
    } catch (error: any) {
      return reply.status(500).send({
        message: error?.message,
      })
    }
  }
}
