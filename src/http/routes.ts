import { FastifyInstance } from 'fastify'
import { authController, userController } from './controllers'

export async function appRoutes(app: FastifyInstance) {
  app.post('/auth', authController.login)

  app.post('/users', userController.create)
  app.get('/users/:id', userController.selectById)
  app.get('/users/find/:email', userController.selectByEmail)
  app.patch('/users/:id', userController.update)
  app.delete('/users/:id', userController.delete)
}
