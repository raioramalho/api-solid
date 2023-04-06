import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { RegisterUser } from '../@types/registerUser'
import { registerService } from '@/http/services'

export class RegisterController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string().min(6),
    })
    const registerUser: RegisterUser = registerBodySchema.parse(request.body)

    try {
      const newUser = await registerService.create(registerUser)
      return reply.status(201).send(newUser)
    } catch (error: any) {
      return reply.status(409).send({
        message: error?.message,
      })
    }
  }
}
