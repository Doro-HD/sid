<script lang='ts'>
  import { createEventDispatcher } from "svelte";
  
  export let icon: string
  export let cssClass = ''

  const dispatcher = createEventDispatcher()
</script>

<iconify-icon
  icon='lucide:{icon}'
  class={cssClass}
  on:click={() => dispatcher('click')}
></iconify-icon>
