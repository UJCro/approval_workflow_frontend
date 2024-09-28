<script lang="ts">
	export let label: string;
	export let value: string;
</script>

<label>
	<span>{label} :</span>
	<input bind:value required {...$$restProps} />
</label>

<style>
	label {
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
	}

	span {
		width: 60px;
	}

	input {
		width: 200px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 10px;
		border-bottom: 1px solid var(--input-border-color);
		color: var(--gray-800);
	}

	input:focus {
		outline: none;
	}
</style>
