<script lang="ts">
	export let width: number = 30;
	export let height: number = 30;
	export let onClick: () => void;
</script>

<button class="clickable" on:click={onClick} style="width: {width}px; height: {height}px;">
	<slot />
</button>

<style>
	.clickable {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.clickable:hover {
		opacity: 0.6;
	}
</style>
