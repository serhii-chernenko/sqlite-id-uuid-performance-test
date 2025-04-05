import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(
    event,
    z.object({
      id: z.string().nonempty().max(255),
    }).safeParse,
  )

  if (params.error) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid URL parameters',
      data: params.error,
    })
  }

  const db = useDatabase()

  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, params.data.id),
    with: {
      posts: true,
    },
  })

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found',
    })
  }

  return user
})
