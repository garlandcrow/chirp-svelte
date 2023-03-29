<script lang="ts">
  import PostView from '~/lib/components/PostView.svelte'

  export let data

  $: title = $postWithAuthor.isSuccess
    ? `${$postWithAuthor.data?.post.content} - @${$postWithAuthor.data?.author.username}`
    : 'Not Found'

  $: post = $postWithAuthor.data?.post
  $: author = $postWithAuthor.data?.author

  const postWithAuthor = data.post()
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

{#if $postWithAuthor.isError}
  <div>404</div>
{:else if post && author}
  <PostView {post} {author} />
{/if}
