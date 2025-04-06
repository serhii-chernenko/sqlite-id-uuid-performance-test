import { customType } from 'drizzle-orm/sqlite-core'

export const publicId = customType<{
  data: string
  driverData: number
}>({
  dataType() {
    return 'integer'
  },
  fromDriver(value) {
    return encodeId(value)
  },
})
