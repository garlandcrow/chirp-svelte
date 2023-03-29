<script lang="ts">
  import api from '$lib/api'
  import { toastStore } from '@skeletonlabs/skeleton'
  import { clerkStore } from 'sveltekit-clerk'
  import LoadingSpinner from './LoadingSpinner.svelte'

  $: user = $clerkStore?.user

  let value = ''

  const ctx = $api.createContext()

  const createPost = $api.posts.create.createMutation({
    onSuccess: () => {
      value = ''
      ctx.posts.getAll.invalidate()
    },
    onError: (e) => {
      let errorMessage = 'Failed to post! Please try again later.'
      const fieldErrors = e.data?.zodError?.fieldErrors.content
      if (fieldErrors && fieldErrors[0]) {
        errorMessage = fieldErrors[0]
      }
      toastStore.trigger({ message: errorMessage, background: 'bg-red-500' })
    },
  })
</script>

<div class="flex w-full gap-3">
  <img
    src={user?.profileImageUrl}
    alt="Profile"
    class="h-14 w-14 rounded-full"
    width={56}
    height={56}
  />
  <input
    placeholder="Type some emojis!"
    class="grow bg-transparent outline-none"
    type="text"
    bind:value
    on:keydown={(e) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        if (value !== '') {
          $createPost.mutate({ content: value })
        }
      }
    }}
    disabled={$createPost.isLoading}
  />
  {#if value !== '' && !$createPost.isLoading}
    <button on:click={() => $createPost.mutate({ content: value })}>Post</button>
  {/if}
  {#if $createPost.isLoading}
    <div class="flex items-center justify-center">
      <LoadingSpinner size={20} />
    </div>
  {/if}
</div>
