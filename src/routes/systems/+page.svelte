<script lang='ts'>
  import Hero from '$lib/components/Hero.svelte'
  import Button from '$lib/components/Button.svelte'
  import Card from '$lib/components/Card.svelte'

  let newSystemName = ''

  let systems = new Map<string, string>()

  function createNewSystem() {
    systems.set(crypto.randomUUID(), newSystemName)
    newSystemName = ''

    systems = systems
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
  <Button
    text='Create new system'
    type='submit'
    cssClass='mx-auto'
  />
</form>

<!-- todo: fix bug, row never stops -->
<div class='flex flex-row flex-wrap'>
  {#each systems as [systemId, systemName] (systemId)}
    <Card
      title={systemName}
      cssClass='ml-3 mb-3'
    >
      <a href='/systems/{systemId}' class='link link-secondary'>Inspect</a>
    </Card>
  {/each}
</div>
