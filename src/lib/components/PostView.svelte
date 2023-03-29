<script lang="ts">
  import dayjs from 'dayjs'
  import relativeTime from 'dayjs/plugin/relativeTime'
  import type { RouterOutputs } from '~/server/api/root'

  type PostWithUser = RouterOutputs['posts']['getAll'][number]

  export let author: PostWithUser['author']
  export let post: PostWithUser['post']

  dayjs.extend(relativeTime)
</script>

<div class="flex gap-3 border-b border-slate-400 p-4">
  <img
    src={author.profileImageUrl}
    class="h-14 w-14 rounded-full"
    alt={`@${author.username}'s profile picture`}
    width={56}
    height={56}
  />
  <div class="flex flex-col">
    <div class="flex gap-1 text-slate-300">
      <a href={`/@${author.username}`}>
        <span>{`@${author.username} `}</span>
      </a>
      <a href={`/post/${post.id}`}>
        <span class="font-thin">{` · ${dayjs(post.createdAt).fromNow()}`}</span>
      </a>
    </div>
    <span class="text-2xl">{post.content}</span>
  </div>
</div>
