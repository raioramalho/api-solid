import { app } from '@/app'
import { env } from '@/env'

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log('🚀 ~ file: server.ts:9 ~ http://localhot:3000:')
  })
