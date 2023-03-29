import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'
import superjson from 'superjson'
import { createTRPCClient, type TRPCClientInit } from 'trpc-sveltekit'
import type { AppRouter } from '~/server/api/root'

let browserClient: ReturnType<typeof createTRPCClient<AppRouter>>

export default function trpc(init?: TRPCClientInit) {
  const isBrowser = typeof window !== 'undefined'
  if (isBrowser && browserClient) return browserClient
  const client = createTRPCClient<AppRouter>({ init, transformer: superjson })
  if (isBrowser) browserClient = client
  return client
}

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
