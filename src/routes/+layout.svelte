<script lang='ts'>
  import { page } from '$app/stores'
  import 'iconify-icon'
  import '../app.css'

  const pages = new Map<string, string>()
  pages.set('Home', '/')
  pages.set('You P.N.P systems', '/systems')
  pages.set('Help', '#')
</script>

<div class='flex mb-3'>
  <div class='tabs mx-auto'>
    {#each pages as [pageName, pagePath]}
      <a
        href={pagePath}
        class='tab tab-lg tab-bordered'
        class:tab-active={$page.url.pathname === pagePath}
      >
        {pageName}
      </a>
    {/each}
  </div>
</div>

<slot />
