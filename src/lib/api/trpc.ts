import superjson from 'superjson'
import { createTRPCClient, type TRPCClientInit } from 'trpc-sveltekit'
import type { AppRouter } from '~/server/api/root'
import { svelteQueryWrapper } from 'trpc-svelte-query-adapter'
import type { QueryClient } from '@tanstack/svelte-query'

let browserClient: ReturnType<typeof svelteQueryWrapper<AppRouter>>

export function makeTRPCClient(init?: TRPCClientInit, queryClient?: QueryClient) {
  const isBrowser = typeof window !== 'undefined'
  if (isBrowser && browserClient) return browserClient
  const client = svelteQueryWrapper<AppRouter>({
    client: createTRPCClient<AppRouter>({ init, transformer: superjson }),
    queryClient,
  })
  if (isBrowser) browserClient = client
  return client
}
