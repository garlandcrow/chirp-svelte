<script lang="ts">
  import { page } from '$app/stores'
  import { toastStore } from '@skeletonlabs/skeleton'
  import { clerkStore } from 'sveltekit-clerk'
  import trpc from '~/lib/trpc-client'
  import LoadingSpinner from './LoadingSpinner.svelte'

  $: user = $clerkStore?.user

  let inputValue = ''
  let isPosting = false

  async function mutate(data: { content: string }) {
    try {
      isPosting = true
      await trpc($page).posts.create.mutate(data)
      inputValue = ''
    } catch (e: unknown) {
      let errorMessage = 'Failed to post! Please try again later.'
      if (typeof e === 'object') {
        const messageArray = (e as any)?.data?.zodError?.fieldErrors.content
        if (messageArray && messageArray[0]) {
          errorMessage = messageArray[0]
        }
      }

      toastStore.trigger({ message: errorMessage, background: 'bg-red-500' })
    } finally {
      isPosting = false
    }
  }
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
    bind:value={inputValue}
    on:keydown={(e) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        if (inputValue !== '') {
          mutate({ content: inputValue })
        }
      }
    }}
    disabled={isPosting}
  />
  {#if inputValue !== '' && !isPosting}
    <button on:click={() => mutate({ content: inputValue })}>Post</button>
  {/if}
  {#if isPosting}
    <div class="flex items-center justify-center">
      <LoadingSpinner size={20} />
    </div>
  {/if}
</div>
