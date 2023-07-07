<script lang='ts'>
  export let title: string
  //will only be applied to the outer most part of the card
  export let cssClass = ''
</script>

<div class='card bg-base-200 shadow-md w-56 {cssClass}'>
  <div class='card-body'>
    <h2 class='card-title break-all'>{title}</h2>
    <slot />
    <!-- actions are for buttons -->
    {#if $$slots.actions}
      <div class='card-actions'>
        <slot name='actions' />
      </div>
    {/if}
  </div>
</div>
