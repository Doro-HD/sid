<script lang='ts'>
  import Icon from '$lib/components/Icon.svelte'

  export let title: string
  export let icon: string
  export let iconHoverColor = ''
</script>
<li>
  <h2 class='menu-title text-lg'>
    {title}
    {#if icon !== null}
      <Icon
        {icon}
        cssClass='hover:{iconHoverColor}'
      />
    {/if}
  </h2>
  <ul>
    <slot />
  </ul>
</li>
