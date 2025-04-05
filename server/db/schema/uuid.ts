// import { randomUUID } from 'node:crypto'
import { relations } from 'drizzle-orm'
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'

/**
 * @description
 * $defaultFn(() => randomUUID()_ is commented
 * because I have to collect user ID in the seed function
 * and then use it in the post creation
 * to make a reference to the user
 */

export const users = sqliteTable('users', {
  // id: text().$defaultFn(() => randomUUID()).unique().primaryKey(),
  id: text().unique().primaryKey(),
  name: text('name').notNull(),
})

export const posts = sqliteTable('posts', {
  // id: text().$defaultFn(() => randomUUID()).unique().primaryKey(),
  id: text().unique().primaryKey(),
  title: text().notNull(),
  authorId: integer('author_id').references(() => users.id),
})

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}))

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
}))
