<script lang='ts'>
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
