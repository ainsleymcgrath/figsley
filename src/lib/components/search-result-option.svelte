<script lang="ts">
	import type { FigletRecord } from '$lib/stores';
	import { fontRecordsByName } from '$lib/stores';

	export let data: FigletRecord;
	export let focused = false;

	const toggleSelection = () => {
		$fontRecordsByName = {
			...$fontRecordsByName,
			[data.font]: { ...data, selected: !data.selected }
		};
	};

	const keydown = (e: KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			toggleSelection();
		}
	};

	const click = () => {
		toggleSelection();
	};
</script>

<li
	on:keydown={keydown}
	on:click={click}
	tabindex="-1"
	class={`${data.selected && 'bg-red-500'} ${focused && 'underline'} outline-0`}
>
	{data.font}
</li>
