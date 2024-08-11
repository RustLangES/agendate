export default defineEventHandler(async ({ context }) => {
  const db = process.env.DB || context.cloudflare.env.DB

  const { formId } = context.params as { formId: number }

  try {
    const { results: availabilities } = await db.prepare('SELECT * FROM availability WHERE form_id = ?').bind(parseInt(formId)).all()
    const { results: form } = await db.prepare('SELECT * FROM forms WHERE id = ?').bind(formId).run()

    return { availabilities, form: form[0] }
  } catch (error) {
    console.error('Error al consultar la base de datos:', error)
    return { error: 'Error al obtener disponibilidades' }
  }
})
