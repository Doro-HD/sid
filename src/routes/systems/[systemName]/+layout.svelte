<script lang='ts'>
  import { onMount } from 'svelte'
  import { page } from '$app/stores'

  import { paths, createJsonFile, openDir } from '$lib/tauri/fs'

  import Menu from '$lib/components/Menu.svelte'
  import MenuTitle from '$lib/components/MenuTitle.svelte'
  import Icon from '$lib/components/Icon.svelte'
	import Modal from '$lib/components/Modal.svelte';

  const systemName = $page.params.systemName

  let sheets: string[] = []
  let entities: string[] = []

  //used to create sheet and entity name
  let createResourceName = ''
  let isCreateResourceError = false
  let sheetOrEntityPath: string

  let isModalOpen = false

  onMount(async () => {
    const sheetNames = await openResource($paths.sheets)
    const entityNames = await openResource($paths.entities)

    if (sheetNames) {
      sheets = sheetNames
    }

    if (entityNames) {
      entities = entityNames
    }
  })

  async function openResource(resource: string) {
    const result = await openDir(`${$paths.systems}/${systemName}/${resource}`)
    //exit point
    if (!result.success) {
      return
    }

    const files = result.files.map(file => {
      let fileName = file?.name
      if (fileName) {
        fileName = fileName.replace(/\.json$/g, '')
      }

      return fileName ?? 'Error!'
    })

    return files
  }


  function openModal(path: string) {
    sheetOrEntityPath = path
    isModalOpen = true
  }

  async function createResource() {
    const result = await createJsonFile(`${$paths.systems}/${systemName}/${sheetOrEntityPath}/${createResourceName}`, {})
  }
</script>

<div class='flex flex-row grow'>
  <!-- menu -->
  <div class='w-1/6'>
    <Menu
      cssClass='h-full'
    >
      <MenuTitle
        title='Sheets'
      >
        <svelte:fragment slot='title'>
          <Icon
            icon='plus'
            cssClass='hover:text-success'
            on:click={() => openModal($paths.sheets)}
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
            on:click={() => openModal($paths.entities)}
          />
        </svelte:fragment>
      </MenuTitle>
    </Menu>
  </div>

  <!-- sheet content -->
  <div class='mx-3 w-full h-full flex-col'>
    <slot />
  </div>
</div>

<Modal
  title='Create Resource'
  bind:isOpen={isModalOpen}
  on:save={createResource}
  on:cancel={() => isModalOpen = false}
>
  <form on:submit|preventDefault={createResource}>
    <input
      type='text'
      class='input input-secondary input-sm input-bordered mx-auto mb-2'
      bind:value={createResourceName}
    >
    {#if isCreateResourceError}
      <label class='label mx-auto'>
        <span class='label-text-alt text-red-500'>Name is not validName is not valid/span>
      </label>
    {/if}
  </form>
</Modal>