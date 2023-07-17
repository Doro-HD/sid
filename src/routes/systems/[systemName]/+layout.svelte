<script lang='ts'>
  import { onMount } from 'svelte'
  import { page } from '$app/stores'

  import { paths, openDir } from '$lib/tauri/fs'

  import Menu from '$lib/components/Menu.svelte'
  import MenuTitle from '$lib/components/MenuTitle.svelte'
  import Icon from '$lib/components/Icon.svelte'

  const systemName = $page.params.systemName

  let sheets: string[] = []
  let entities: string[] = []

  onMount(async () => {
    const sheetData = await openDir(`${$paths.systems}/${systemName}/sheets`)
    const entityData = await openDir(`${$paths.systems}/${systemName}/entities`)

    //exit point
    if (!sheetData.success || !entityData.success) {
      return
    }

    const removeFileExtention = (fileName: string | undefined) => {
      if (fileName) {
        fileName = fileName.replace(/\.json$/g, '')
      }

      return fileName ?? 'Error!'
    }

    sheets = sheetData.files.map(file => removeFileExtention(file.name))
    entities = entityData.files.map(file => removeFileExtention(file.name))
  })
</script>

<div class='flex flex-row'>
  <div class='w-1/6'>
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
        {#each sheets as sheet}
          <li>
            <a href='/systems/{systemName}/sheets/{sheet}'>
              {sheet}
            </a>
          </li>
        {/each}
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
  </div>

  <div class='mx-3'>
    <slot />
  </div>
</div>