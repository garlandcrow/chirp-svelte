<script lang="ts">
  import '@skeletonlabs/skeleton/themes/theme-skeleton.css'
  import '@skeletonlabs/skeleton/styles/all.css'
  import '../app.postcss'
  import { initClerkStore } from 'sveltekit-clerk'
  import { Toast } from '@skeletonlabs/skeleton'

  initClerkStore()
</script>

<svelte:head>
  <title>Chirp</title>
  <meta name="description" content="💭" />
</svelte:head>

<Toast />

<main class="overflow-none flex h-screen justify-center">
  <div class="flex h-full w-full flex-col border-x border-slate-400 md:max-w-2xl">
    <slot />
  </div>
</main>
