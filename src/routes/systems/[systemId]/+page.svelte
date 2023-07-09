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
  >
    <svelte:fragment slot='title'>
      <Icon
        icon='plus'
        cssClass='hover:text-success'
      />
    </svelte:fragment>
  </MenuTitle>
  <MenuTitle
    title='Entities'
  >
    <svelte:fragment slot='title'>
      <Icon
        icon='plus'
        cssClass='hover:text-success'
      />
    </svelte:fragment>
  </MenuTitle>
</Menu>
