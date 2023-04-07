import { FastifyInstance } from 'fastify'
import { userController } from './controllers'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', userController.create)
  app.get('/users/:id', userController.selectById)
  app.get('/users/find/:email', userController.selectByEmail)
  app.patch('/users/:id', userController.update)
  app.delete('/users/:id', userController.delete)
}
