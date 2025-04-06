import * as schema from '../db/schema/int'

export default defineTask({
  meta: {
    name: 'db:seed:int',
    description: 'Run database seed task',
  },
  async run() {
    const db = await useDatabase()
    const USERS_COUNT = 1_000_000
    const POSTS_COUNT = 10_000_000
    const BATCH_SIZE = 50

    async function batchInsert(
      table: typeof schema.users | typeof schema.posts,
      data: Record<string, any>[],
    ) {
      for (let i = 0; i < data.length; i += BATCH_SIZE) {
        const batch = data.slice(i, i + BATCH_SIZE)
        await db.insert(table).values(batch).run()
      }
    }

    async function seedUsersAndPosts() {
      const userSeedData = []
      const postSeedData = []

      for (let i = 1; i <= USERS_COUNT; i++) {
        userSeedData.push({
          name: `User ${i}`,
        })
      }

      for (let i = 1; i <= POSTS_COUNT; i++) {
        postSeedData.push({
          title: `Post ${i}`,
          authorId: Math.floor(Math.random() * USERS_COUNT) + 1,
        })
      }

      await batchInsert(schema.users, userSeedData)
      await batchInsert(schema.posts, postSeedData)
    }

    await seedUsersAndPosts().catch((err) => {
      return console.error('Error during seeding:', err)
    })

    return { result: 'success' }
  },
})
