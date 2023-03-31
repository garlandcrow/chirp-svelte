import { TRPCError } from '@trpc/server'
import { desc, eq } from 'drizzle-orm/expressions'
import { clerkClient } from 'sveltekit-clerk/server'
import { z } from 'zod'
import { posts, type Post } from '~/db/schema'
import { createTRPCRouter, privateProcedure, publicProcedure } from '~/server/api/trpc'
import { filterUserForClient } from '~/server/helpers/filterUserForClient'

// import { Ratelimit } from '@upstash/ratelimit' // for deno: see above
// import { Redis } from '@upstash/redis'

const addUserDataToPosts = async (posts: Post[]) => {
  const userId = posts.map((post) => post.authorId)
  const users = (
    await clerkClient.users.getUserList({
      userId: userId,
      limit: 110,
    })
  ).map(filterUserForClient)

  return posts.map((post) => {
    const author = users.find((user) => user.id === post.authorId)

    if (!author || !author.username) {
      console.error('AUTHOR NOT FOUND', post)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Author for post not found. POST ID: ${post.id}, USER ID: ${post.authorId}`,
      })
    }

    return {
      post,
      author: {
        ...author,
        username: author.username,
      },
    }
  })
}

// Create a new ratelimiter, that allows 3 requests per 1 minute
// const ratelimit = new Ratelimit({
//   redis: Redis.fromEnv(),
//   limiter: Ratelimit.slidingWindow(3, '1 m'),
//   analytics: true,
// })

export const postsRouter = createTRPCRouter({
  getById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    const queryPosts = await ctx.db.select().from(posts).where(eq(posts.id, input.id)).limit(1)

    if (!queryPosts[0]) throw new TRPCError({ code: 'NOT_FOUND' })

    return (await addUserDataToPosts(queryPosts))[0]
  }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const queryPosts = await ctx.db.select().from(posts).limit(100).orderBy(desc(posts.createdAt))

    return addUserDataToPosts(queryPosts)
  }),

  getPostsByUserId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(({ ctx, input }) =>
      ctx.db
        .select()
        .from(posts)
        .where(eq(posts.authorId, input.userId))
        .limit(100)
        .orderBy(desc(posts.createdAt))
        .then(addUserDataToPosts)
    ),

  create: privateProcedure
    .input(
      z.object({
        content: z.string().emoji('Only emojis are allowed').min(1).max(280),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.userId

      // const { success } = await ratelimit.limit(authorId)
      // if (!success) throw new TRPCError({ code: 'TOO_MANY_REQUESTS' })

      const post = await ctx.db
        .insert(posts)
        .values({
          id: undefined,
          authorId,
          content: input.content,
        })
        .execute()

      return post
    }),
})
