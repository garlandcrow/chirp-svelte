import { makeTRPCClient } from '~/lib/api/trpc'
import type { PageLoad } from './$types'

export const load: PageLoad = async function (event) {
  const { queryClient } = await event.parent()
  const client = makeTRPCClient(event, queryClient)

  const { id } = event.params

  const post = client.posts.getById.createServerQuery({ id }, { retry: 1 })
  return { post }
}
