<script lang="ts">
	import { beforeUpdate } from 'svelte';

	export let selection: string[] = [];
	let item: HTMLElement;

	export let focused: boolean;
	export let font: string;

	beforeUpdate(() => {
		if (focused && item) {
			item.focus();
		}
	});

	const addOrRemoveFromSelection = () => {
		if (selection.includes(font)) {
			selection = selection.filter((f) => f !== font);
		} else {
			selection = [...selection, font];
		}
	};

	const keydown = (e: KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			addOrRemoveFromSelection();
		}
	};

	const click = () => {
		addOrRemoveFromSelection();
	};
</script>

<li
	on:keydown={keydown}
	on:click={click}
	tabindex="-1"
	class="focus:bg-red-500 outline-0"
	bind:this={item}
>
	{font}
</li>
