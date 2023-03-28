import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'

export const greetingRouter = createTRPCRouter({
  greet: publicProcedure.query(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return `Hello tRPC v10 @ ${new Date().toLocaleTimeString()}`
  }),
})
