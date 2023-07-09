<script lang='ts'>
  import Icon from '$lib/components/Icon.svelte'

  export let title: string
</script>
<li>
  <h2 class='menu-title text-lg'>
    {title}
    <slot name='title' />
  </h2>
  <ul>
    <slot />
  </ul>
</li>
