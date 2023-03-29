// hooks.server.ts
import { createTRPCHandle } from 'trpc-sveltekit'
import { appRouter as router } from '~/server/api/root'
import { createTRPCContext as createContext } from '~/server/api/trpc'
import { clerkAuthHandle } from 'sveltekit-clerk/server'
import { sequence } from '@sveltejs/kit/hooks'

export const handle = sequence(
  clerkAuthHandle,
  createTRPCHandle({ router, createContext }),
  async ({ event, resolve }) => {
    const res = await resolve(event)
    // console.debug(`src/hooks.server.ts(10): event.locals :>> `, event.locals)
    return res
  }
)
