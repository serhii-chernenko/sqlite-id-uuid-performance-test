import { relations } from 'drizzle-orm'
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: integer().primaryKey(),
  name: text('name').notNull(),
})

export const posts = sqliteTable('posts', {
  id: integer().primaryKey(),
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
