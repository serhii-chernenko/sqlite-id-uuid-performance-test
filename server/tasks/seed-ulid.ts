import { ulid } from 'ulid'
import * as schema from '../db/schema/uuid'

export default defineTask({
  meta: {
    name: 'db:seed:ulid',
    description: 'Run database seed task',
  },
  async run() {
    const db = await useDatabase()
    const USERS_COUNT = 1_000_000
    const POSTS_COUNT = 10_000_000
    const BATCH_SIZE = 33 // decreased because requests with UUIDs are larger

    async function batchInsert(
      table: typeof schema.users | typeof schema.posts,
      data: Record<string, any>[],
    ) {
      for (let i = 0; i < data.length; i += BATCH_SIZE) {
        const batch = data.slice(i, i + BATCH_SIZE)
        // @ts-expect-error
        await db.insert(table).values(batch).run()
      }
    }

    async function seedUsersAndPosts() {
      const userSeedData = []
      const postSeedData = []
      const userIds: string[] = Array.from({ length: USERS_COUNT }, () => {
        return ulid()
      })

      const postIds: string[] = Array.from({ length: POSTS_COUNT }, () => {
        return ulid()
      })

      for (let i = 1; i <= USERS_COUNT; i++) {
        userSeedData.push({
          id: userIds[i - 1],
          name: `User ${i}`,
        })
      }

      for (let i = 1; i <= POSTS_COUNT; i++) {
        postSeedData.push({
          id: postIds[i - 1],
          title: `Post ${i}`,
          authorId: userIds[Math.floor(Math.random() * USERS_COUNT)],
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
