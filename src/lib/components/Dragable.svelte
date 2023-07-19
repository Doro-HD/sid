<script>
	export let left = 100;
	export let top = 100;
	
	let moving = false;
	
	function onMouseMove(e) {
		if (moving) {
			left += e.movementX;
			top += e.movementY;
		}
	}
</script>

<svelte:window on:mouseup={() => moving = false} on:mousemove={onMouseMove} />

<section
  on:mousedown={() => moving = true}
  style="left: {left}px; top: {top}px;"
  class="draggable"
>
	<slot></slot>
</section>

<style>
	.draggable {
		user-select: none;
		cursor: move;
		border: solid 1px gray;
    /* position must be absolute for the component to be dragable */
		position: absolute;
	}
</style>
