<script lang='ts'>
  import { createEventDispatcher } from "svelte";

  export let text: string
  export let type: 'button' | 'submit' | 'reset' = 'button'
  export let cssClass = ''

  const dispatcher = createEventDispatcher()  
</script>

<button
  {type}
  class='btn btn-outline btn-secondary btn-sm {cssClass}'
  on:click={() => dispatcher('click')}
>{text}</button>
