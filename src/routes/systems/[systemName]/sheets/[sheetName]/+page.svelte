<script lang='ts'>
  import { page } from '$app/stores'
  import Tabs from '$lib/components/Tabs.svelte'
  import Tab from '$lib/components/Tab.svelte'
  import Button from '$lib/components/Button.svelte'

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
    <Button
      text='+'
    ></Button>
  </Tab>
</Tabs>
