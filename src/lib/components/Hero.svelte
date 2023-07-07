<script lang="ts">
  export let title: string
</script>

<div class='hero bg-base-200'>
  <div class='hero-content '>
    <div class='max-w-md'>
      <h1 class='text-5xl font-bold'>{title}</h1>
      <p class='py-6'>
        <slot />
      </p>
      <slot name='bottom-content' />
    </div>
  </div>
</div>
