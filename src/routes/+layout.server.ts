import { db } from '~/db'
import { posts } from '~/db/schema'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async (event) => {
  const res = await db.select().from(posts)
  console.debug(`src/routes/+layout.server.ts(8): res :>> `, res)
  return { session: event.locals.session }
}
