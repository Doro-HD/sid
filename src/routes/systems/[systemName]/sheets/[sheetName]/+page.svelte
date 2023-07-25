<script lang='ts'>
  import { page } from '$app/stores'

  import { draggable } from '@neodrag/svelte'

  import Tabs from '$lib/components/Tabs.svelte'
  import Tab from '$lib/components/Tab.svelte'
  import Button from '$lib/components/Button.svelte'
  import Icon from '$lib/components/Icon.svelte'
	import Dragable from '$lib/components/Dragable.svelte';

  let pages = ['Main']

  const sheetName = $page.url.pathname
  const tabType = 'lifted'
  const tabSize = 'lg'
</script>


<Tabs>
  {#each pages as page}
    <Tab
      type={tabType}
      size={tabSize}
      isActive={true}
    >
      {page}
    </Tab>
  {/each}
  <Tab
    type={tabType}
    size={tabSize}
    isActive={false}
  >
    <Button>
      <Icon
        icon='plus'
      />
    </Button>
  </Tab>
</Tabs>

<div class='h-full'>
  <p class='w-1/5' use:draggable={{ bounds: 'parent' }}>test</p>
</div>

