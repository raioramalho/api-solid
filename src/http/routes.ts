import { FastifyInstance } from 'fastify'
import { userController } from './controllers'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', userController.create)
  app.get('/users/:id', userController.select)
  app.patch('/users/:id', userController.update)
  app.delete('/users/:id', userController.delete)
  // TODO: Get user by id: service and controller
  // app.get('/users/:id', userController.select)
}
