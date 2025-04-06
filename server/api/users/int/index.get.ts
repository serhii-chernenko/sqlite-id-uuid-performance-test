export default defineEventHandler(async () => {
  return await useDatabase().query.users.findMany({
    limit: 10,
    with: {
      posts: {
        limit: 3,
        columns: {
          authorId: false,
        },
      },
    },
  })
})
