import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { userService } from '../services'
import { CreateUser } from '../@types/createUser'

export class UserController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string().min(6),
    })
    const createUser: CreateUser = registerBodySchema.parse(request.body)

    try {
      const newUser = await userService.create(createUser)
      return reply.status(201).send(newUser)
    } catch (error: any) {
      return reply.status(409).send({
        message: error?.message,
      })
    }
  }
}
