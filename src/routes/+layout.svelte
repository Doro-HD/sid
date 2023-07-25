<script lang='ts'>
  import { page } from '$app/stores'
  import 'iconify-icon'
  import '../app.css'

  const pages = new Map<string, string>()
  pages.set('Home', '/')
  pages.set('Your P.N.P systems', '/systems')
  pages.set('Help', '#')
</script>

<div class='flex flex-col h-screen w-screen'>
  <div class='flex mb-3'>
    <!-- navbar/tabs :refactor use tab component -->
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
</div>