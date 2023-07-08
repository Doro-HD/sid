<script lang='ts'>
  import { slide } from 'svelte/transition'
  import Hero from '$lib/components/Hero.svelte'
  import Button from '$lib/components/Button.svelte'
  import Card from '$lib/components/Card.svelte'
	import Modal from '$lib/components/Modal.svelte';

  let newSystemName = ''
  let isCreateError = false

  let updateSystemId = ''
  let updateSystemName = ''
  let tempUpdateSystemName = ''
  let isUpdateError = false

  const systemNameErrorMessage = 'Length of system name should have at least one character'

  let isModalOpen = false

  let systems = new Map<string, string>()

  function createNewSystem() {
    //exit point
    if (newSystemName.length < 1) {
      isCreateError = true

      return
    }

    //if there was a previous error the message will be removed here
    isCreateError = false

    systems.set(crypto.randomUUID(), newSystemName)
    newSystemName = ''

    systems = systems
  }

  function updateSystem() {
    //exit point
    if (tempUpdateSystemName.length < 1) {
      isUpdateError = true

      return
    }

    isUpdateError = false

    systems.set(updateSystemId, tempUpdateSystemName)
    systems = systems

    isModalOpen = false
  }

  function openModal(systemId: string) {
    updateSystemId = systemId
    updateSystemName = systems.get(systemId)

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

<!-- todo: fix bug, row never stops -->
<div class='flex flex-row flex-wrap'>
  {#each systems as [systemId, systemName] (systemId)}
    <span transition:slide>
      <Card
        title={systemName}
        cssClass='ml-3 mb-3'
        on:edit={() => openModal(systemId)}
      >
        <a href='/systems/{systemId}' class='link link-secondary'>Open</a>
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
