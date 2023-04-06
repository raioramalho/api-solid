import { FastifyInstance } from 'fastify'
import { registerController } from '@/http/controllers'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerController.create)
}
