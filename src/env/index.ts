import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'prod']).default('dev'),
  PORT: z.coerce.number().default(3000),
  PASS_SALT: z.coerce.number().default(10),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.log(
    '🚀 ~ file: index.ts:11 ~ if: Invalid env variables!',
    _env.error.format(),
  )
  throw new Error('Invalid env variables!')
}

export const env = _env.data
