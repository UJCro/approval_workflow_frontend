<script lang="ts">
	import type { BtnType } from '@/types/button';

	export let content: string;
	export let onClick: () => void = () => {};
	export let color: BtnType;
</script>

<button class={`btn ${color}`} on:click={onClick} {...$$restProps}>{content}</button>

<style>
	.btn {
		width: 80px;
		padding: 8px 12px;
		border-radius: 4px;
	}

	.btn:hover {
		opacity: 0.6;
	}

	.primary {
		background-color: var(--button-background-color);
		color: var(--button-font-color);
	}

	.secondary {
		background-color: #d9d9d9d9;
		color: #000000;
	}

	.destructive {
		background-color: #d80000;
		color: #ffffff;
	}
</style>
