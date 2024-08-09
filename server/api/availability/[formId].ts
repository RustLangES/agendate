import { D1Database } from '@cloudflare/workers-types'

export default defineEventHandler(async (event) => {
  const { formId } = event.context.params as { formId: number }
  const env = event.context.cloudflare.env as { DB: D1Database }
  const db = env.DB

  try {
    const { results: availabilities } = await db.prepare('SELECT * FROM availability WHERE form_id = ?').bind(parseInt(formId)).all()
    const { results: form } = await db.prepare('SELECT * FROM forms WHERE id = ?').bind(formId).run()

    return { availabilities, form: form[0] }
  } catch (error) {
    console.error('Error al consultar la base de datos:', error)
    return { error: 'Error al obtener disponibilidades' }
  }
})
