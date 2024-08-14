export default defineEventHandler(async ({ context }) => {
  const db = process.env.DB || context.cloudflare.env.DB

  const { formId } = context.params as { formId: number }

  try {
    const results = await db.batch([
      db.prepare('SELECT * FROM forms WHERE id = ?').bind(formId),
      db.prepare('SELECT * FROM availability WHERE form_id = ?').bind(formId),
      db.prepare('SELECT * FROM appointments WHERE form_id = ?').bind(formId),
    ])

    return {
      form: results[0].results[0] || null,
      availabilities: results[1].results,
      appointments: results[2].results,
    }
  } catch (error) {
    console.error('Error al consultar la base de datos:', error)
    return { error: 'Error al obtener disponibilidades' }
  }
})
