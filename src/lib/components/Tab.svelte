<script lang='ts'>
  export let type: 'bordered' | 'lifted' | 'boxed'
  export let size: 'xs' | 'sm' | 'md' | 'lg' | '' = ''
  export let isActive: boolean

  const tabSize = size.length > 0 ? 'tab-' + size : ''
</script>

<a
  href='#'
  class='tab tab-{type} {tabSize}'
  class:tab-active={isActive}
>
  <slot />
</a>