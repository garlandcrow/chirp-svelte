<script lang="ts">
  import api from '~/lib/api'
  import PostView from '~/lib/components/PostView.svelte'
  import LoadingPage from '~/lib/components/LoadingPage.svelte'

  export let data

  const user = data.user()
  $: console.debug(`src/routes/[slug]/+page.svelte(9): $user.status :>> `, $user.status)
  $: console.debug(`src/routes/[slug]/+page.svelte(9): errorrr :>> `, $user.error)

  $: userId = $user.data?.id

  $: posts =
    typeof userId !== 'undefined' ? $api.posts.getPostsByUserId.createQuery({ userId }) : undefined
</script>

<svelte:head>
  <title>{data.username}</title>
</svelte:head>

<div class="relative h-36 bg-slate-600">
  <img
    src={$user.data?.profileImageUrl}
    alt={`${data.username}'s profile pic`}
    width={128}
    height={128}
    class="absolute bottom-0 left-0 -mb-[64px] ml-4 rounded-full border-4 border-black bg-black"
  />
</div>
<div class="h-[64px]" />
<div class="p-4 text-2xl font-bold">{`@${data.username ?? ''}`}</div>
<div class="w-full border-b border-slate-400" />

{#if $user.isError}
  <div>User has not posted</div>
{:else if typeof $posts === 'undefined' || $posts.isLoading}
  <LoadingPage />
{:else if $posts.isError}
  <div>Something went wrong</div>
{:else}
  {#each $posts.data as fullPost}
    <div class="flex flex-col">
      <PostView {...fullPost} />
    </div>
  {:else}
    <div>User has not posted</div>
  {/each}
{/if}
