<script lang='ts'>
  import { createEventDispatcher } from "svelte";

  export let type: 'button' | 'submit' | 'reset' = 'button'
  export let cssClass = ''
  export let color = 'secondary'

  const dispatcher = createEventDispatcher()  
</script>

<button
  {type}
  class='btn btn-outline btn-{color} btn-sm {cssClass}'
  on:click={() => dispatcher('click')}
>
  <slot />
</button>
