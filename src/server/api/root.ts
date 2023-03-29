import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'
import { postsRouter } from './routers/posts'
import { profileRouter } from './routers/profile'
import { createTRPCRouter } from './trpc'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */

export const appRouter = createTRPCRouter({
  posts: postsRouter,
  profile: profileRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>
