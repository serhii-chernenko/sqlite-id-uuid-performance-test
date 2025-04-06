import { relations } from 'drizzle-orm'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { publicId } from '../../utils/public-id'

export const users = sqliteTable('users', {
  id: publicId().primaryKey(),
  name: text('name').notNull(),
})

export const posts = sqliteTable('posts', {
  id: publicId().primaryKey(),
  title: text().notNull(),
  authorId: publicId('author_id').references(() => {
    return users.id
  }),
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
