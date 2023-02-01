<script lang="ts">
	import type { FigletRecord } from '$lib/stores';
	import { fontRecordsByName } from '$lib/stores';
	import { beforeUpdate } from 'svelte';

	export let data: FigletRecord;
	export let focused = false;
	let element: HTMLElement;

	const toggleSelection = () => {
		$fontRecordsByName[data.font]!.selected = !data.selected;
	};

	const keydown = (e: KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			toggleSelection();
		}
	};

	beforeUpdate(() => {
		if (element && focused) {
			element.focus();
		}
	});

	const click = () => {
		toggleSelection();
	};
</script>

<li class={`${data.selected && 'bg-red-500'} `}>
	<button class="underline-hover-focus" bind:this={element} on:keydown={keydown} on:click={click}>
		{data.font}
	</button>
</li>
