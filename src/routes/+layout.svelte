<script lang="ts">
  import { loadClerkStore } from 'sveltekit-clerk'

  loadClerkStore()
</script>

<div class="container">
  <main>
    <slot />
  </main>
</div>
