import { FastifyInstance } from 'fastify'
import { userController } from './controllers'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', userController.create)
}
