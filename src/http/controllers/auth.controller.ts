import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { authService } from '../services'

interface LoginUserDto {
  email: string
  password: string
}

export class AuthController {
  async login(request: FastifyRequest, reply: FastifyReply) {
    const loginBodySchema = z.object({
      email: z.string(),
      password: z.string().min(6),
    })

    const data: LoginUserDto = loginBodySchema.parse(request.body)

    try {
      const userLogin = await authService.execute(data)
      return userLogin
    } catch (error: any) {
      return reply.status(error?.code).send({
        message: error?.message,
      })
    }
  }
}
