<script lang='ts'>
  import { createEventDispatcher } from 'svelte';
  import Button from '$lib/components/Button.svelte'

  export let title: string
  export let isOpen = false

  const dispatcher = createEventDispatcher()

  function save() {
    dispatcher('save')

    close()
  }

  function cancel() {
    dispatcher('cancel')
    
    close()
  }

  function close() {
    isOpen = false
  }
</script>

<div class='modal' class:modal-open={isOpen}>
  <div class='modal-box'>
    <h3 class='font-bold text-lg mb-3'>{title}</h3>

    <slot />

    <div class='modal-action justify-between'>
      <Button
        on:click={save}
      >
        Save
      </Button>
      <Button
        color='error'
        on:click={cancel}
      >
        Cancel
      </Button>
    </div>
  </div>
</div>