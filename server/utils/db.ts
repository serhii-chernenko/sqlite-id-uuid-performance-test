import { drizzle } from 'drizzle-orm/d1'

import * as schema from '../db/schema/int'

export { sql, eq, and, or } from 'drizzle-orm'

export const tables = schema

export function useDatabase() {
  const db = (globalThis as any).__env__.DB as D1Database

  if (!db) {
    throw new Error('Database not found')
  }

  return drizzle(db, {
    schema,
    casing: 'snake_case',
    logger: true,
  })
}

export type User = typeof tables.users.$inferSelect
export type Post = typeof tables.posts.$inferSelect
