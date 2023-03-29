import { makeTRPCClient } from '~/lib/api/trpc'
import type { PageLoad } from './$types'

export const load: PageLoad = async function (event) {
  const { queryClient } = await event.parent()
  const client = makeTRPCClient(event, queryClient)

  const { slug } = event.params
  const username = slug.replace('@', '')

  const user = client.profile.getUserByUsername.createServerQuery({ username }, { retry: 1 })
  return { user, username }
}
