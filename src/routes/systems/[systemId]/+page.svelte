<script lang='ts'>
  import { page } from '$app/stores'
  import Menu from '$lib/components/Menu.svelte'
  import MenuTitle from '$lib/components/MenuTitle.svelte'
  import Icon from '$lib/components/Icon.svelte'

  const systemId = $page.params.systemId
</script>

<Menu>
  <MenuTitle
    title='Sheets'
    icon='plus'
    iconHoverColor='text-success'
  >
  </MenuTitle>
  <MenuTitle
    title='Entities'
    icon='plus'
    iconHoverColor='text-success'
  >
  </MenuTitle>
</Menu>
