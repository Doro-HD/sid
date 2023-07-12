<script lang='ts'>
  import { onMount } from 'svelte'
  import { slide } from 'svelte/transition'

  import { openDir, addDir, rename } from '$lib/tauri/fs'

  import Hero from '$lib/components/Hero.svelte'
  import Button from '$lib/components/Button.svelte'
  import Card from '$lib/components/Card.svelte'
	import Modal from '$lib/components/Modal.svelte';

  let newSystemName = ''
  let isCreateError = false

  let updateSystemName = ''
  let tempUpdateSystemName = ''
  let isUpdateError = false

  const systemNameErrorMessage = 'Length of system name should have at least one character'

  let isModalOpen = false

  let systems: string[] = []

  onMount(async () => {
    const data = await openDir('systems')

    const files = data.files.map(file => file.name ?? 'Error: could not read file')
    systems = files
  })

  async function createNewSystem() {
    //exit point
    if (newSystemName.length < 1) {
      isCreateError = true

      return
    }

    //exit point
    if (systems.find(system => system === newSystemName)) {
      isCreateError = true

      return
    }

    const data = await addDir(newSystemName)
    const sheetData = await addDir(`${newSystemName}/sheets`)
    const entityData = await addDir(`${newSystemName}/entities`)

    //exit point
    if (!data.success || !sheetData.success || !entityData.success) {
      return
    }

    //if there was a previous error the message will be removed here
    isCreateError = false

    systems.push(newSystemName)
    newSystemName = ''

    systems = systems
  }

  async function updateSystem() {
    //exit point
    if (tempUpdateSystemName.length < 1) {
      isUpdateError = true

      return
    }

    isUpdateError = false

    const data = await rename(`systems/${updateSystemName}`, `systems/${tempUpdateSystemName}`)
    //exit point
    if (!data.success) {
      return
    }

    const systemIndex = systems.findIndex(system => system === updateSystemName)
    systems[systemIndex] = tempUpdateSystemName
    systems = systems

    isModalOpen = false
  }

  function openModal(systemName: string) {
    const systemFound = systems.find(system => system === systemName)
    //exit point
    if (systemFound === undefined) {
      return
    }

    updateSystemName = systemFound
    tempUpdateSystemName = updateSystemName

    isModalOpen = true
  }
</script>

<Hero
  title='Your P.N.P systems'
>
  View, create and edit your pnp systems.
</Hero>

<form
  class='flex flex-col my-3'
  on:submit|preventDefault={createNewSystem}
>
  <input
    type='text'
    class='input input-secondary input-sm input-bordered mx-auto mb-2'
    placeholder='Name of your new system'
    bind:value={newSystemName}
  >
  {#if isCreateError}
    <label class='label mx-auto'>
      <span class='label-text-alt text-red-500'>{systemNameErrorMessage}</span>
    </label>
  {/if}
  <Button
    text='Create new system'
    type='submit'
    cssClass='mx-auto'
  />
</form>

<div class='flex flex-row flex-wrap'>
  {#each systems as system}
    <span transition:slide>
      <Card
        title={system}
        cssClass='ml-3 mb-3'
        on:edit={() => openModal(system)}
      >
        <a href='/systems/{system}' class='link link-secondary'>Open</a>
      </Card>
    </span>
  {/each}
</div>

<Modal
  title='Edit: {updateSystemName}'
  bind:isOpen={isModalOpen}
  on:save={updateSystem}
>
  <form on:submit|preventDefault={updateSystem}>
    <input
      type='text'
      class='input input-secondary input-sm input-bordered mx-auto mb-2'
      bind:value={tempUpdateSystemName}
    >
    {#if isUpdateError}
      <label class='label mx-auto'>
        <span class='label-text-alt text-red-500'>{systemNameErrorMessage}</span>
      </label>
    {/if}
  </form>
</Modal>
