import { D1Database } from '@cloudflare/workers-types'

export default defineEventHandler(async (event) => {
  const env = event.context.cloudflare.env as { DB: D1Database }
  const db = env.DB

  try {
    const { results } = await db.prepare('SELECT * FROM forms').all()

    return { forms: results }
  } catch (error) {
    console.error('Error al consultar la base de datos:', error)
    return { error: 'Error al obtener disponibilidades' }
  }
})
