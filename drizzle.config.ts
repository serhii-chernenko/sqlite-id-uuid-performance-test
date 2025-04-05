import { defineConfig } from 'drizzle-kit'

const localDbName = '34b6d297f8e18b822a0221e7c012a521fbc8ff78d182549d97aefd5a9a9f8007'

export default defineConfig({
  dialect: 'sqlite',
  schema: './server/db/schema/uuid.ts',
  out: '.drizzle/migrations',
  dbCredentials: {
    url: `file:.wrangler/state/v3/d1/miniflare-D1DatabaseObject/${localDbName}.sqlite`,
  },
})
