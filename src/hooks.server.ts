// hooks.server.ts
import type { Handle } from '@sveltejs/kit'
import { createTRPCHandle } from 'trpc-sveltekit'
import { appRouter as router } from '~/server/api/root'
import { createTRPCContext as createContext } from '~/server/api/trpc'

export const handle = createTRPCHandle({ router, createContext }) satisfies Handle
