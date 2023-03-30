import { createId } from '@paralleldrive/cuid2'
import type { InferModel } from 'drizzle-orm'
import { customType, mysqlTable, timestamp, uniqueIndex, varchar } from 'drizzle-orm/mysql-core'

const cuid = customType<{ data: string | undefined; notNull: true }>({
  dataType() {
    return 'varchar(191)' // match prisma
  },
  toDriver(value?: string) {
    return value ?? createId()
  },
})

export const posts = mysqlTable(
  'posts',
  {
    id: cuid('id').primaryKey(),
    createdAt: timestamp('created_at', { fsp: 2 }).notNull().defaultNow(),
    content: varchar('content', { length: 256 }).notNull(),
    authorId: varchar('author_id', { length: 256 }).notNull(),
  },
  (table) => ({
    authorIndex: uniqueIndex('author_idx').on(table.authorId),
  })
)

export type Post = InferModel<typeof posts>
export type NewPost = InferModel<typeof posts, 'insert'>
