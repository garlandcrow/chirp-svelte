<script lang="ts">
  import { initClerkStore } from 'sveltekit-clerk'

  initClerkStore()
</script>

<div class="container">
  <main>
    <slot />
  </main>
</div>
