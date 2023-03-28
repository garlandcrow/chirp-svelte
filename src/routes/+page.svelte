<script lang="ts">
  import { page } from '$app/stores'
  import { clerk, SignIn, UserButton } from 'sveltekit-clerk'
  import trpc from '~/lib/trpc-client'

  let greeting = 'press the button to load data'
  let loading = false

  const loadData = async () => {
    loading = true
    greeting = await trpc($page).greeting.greet.query()
    console.debug(`src/routes/+page.svelte(11): greeting :>> `, greeting)

    loading = false
  }

  $: loggedIn = Boolean($page.data.session)
</script>

<h6>Loading data in<br /><code>+page.svelte</code></h6>

<a
  href="#load"
  role="button"
  class="secondary"
  aria-busy={loading}
  on:click|preventDefault={loadData}>Load</a
>
<p>{greeting}</p>

{#if loggedIn}
  logged in
  <button style="padding: 2rem;" on:click={() => $clerk?.signOut()}>logout</button>
  <UserButton />
  {#await trpc($page).posts.getAll.query()}
    <p>loading posts...</p>
  {:then posts}
    <div>
      {#each posts as post}
        {post.post.content}
        {post.author.username}
      {/each}
    </div>
  {/await}
{:else}
  <SignIn />
{/if}
