import type { InferModel } from 'drizzle-orm'
import { mysqlTable, serial, timestamp, uniqueIndex, varchar } from 'drizzle-orm/mysql-core'

export const posts = mysqlTable(
  'posts',
  {
    id: serial('id').primaryKey(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    content: varchar('content', { length: 256 }).notNull(),
    authorId: varchar('author_id', { length: 256 }).notNull(),
  },
  (table) => ({
    authorIndex: uniqueIndex('author_idx').on(table.authorId),
  })
)

export type Post = InferModel<typeof posts>
export type NewPost = InferModel<typeof posts, 'insert'>
