export default defineEventHandler(async ({ context }) => {
  const db = process.env.DB || context.cloudflare.env.DB

  try {
    const { results } = await db.prepare('SELECT * FROM forms').all()

    return { forms: results }
  } catch (error) {
    console.error('Error al consultar la base de datos:', error)
    return { error: 'Error al obtener disponibilidades' }
  }
})
