<script lang="ts">
	import type { FigletRecord } from '$lib/stores';
	import { fontRecordsByName } from '$lib/stores';
	import { beforeUpdate } from 'svelte';

	export let data: FigletRecord;
	export let focused = false;
	let element: HTMLElement;
	let browsing: boolean = true;

	const toggleSelection = () => {
		$fontRecordsByName[data.font]!.selected = !data.selected;
	};

	const keydown = (e: KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			toggleSelection();
		}
		if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
			e.preventDefault();
		}
	};

	beforeUpdate(() => {
		if (browsing || !element) return;
		if (focused) {
			element.focus();
		}
	});

	const click = () => {
		toggleSelection();
	};
</script>

<li class={`${data.selected && 'bg-red-500'} `} bind:this={element}>
	<button class="focus:underline outline-0" on:keydown={keydown} on:click={click}>
		{data.font}
	</button>
</li>
