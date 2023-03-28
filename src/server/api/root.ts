import { greetingRouter } from './routers/greeting'
import { postsRouter } from './routers/posts'
import { createTRPCRouter } from './trpc'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */

export const appRouter = createTRPCRouter({
  greeting: greetingRouter,
  posts: postsRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
