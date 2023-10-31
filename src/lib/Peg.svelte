<script lang="ts">
	import { settingsStore } from '$lib/settingsStore';
	import { slide, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	let numberOfColours: number = $settingsStore.numberOfColours;

	const colours = [
		'bg-red-600',
		'bg-yellow-400',
		'bg-green-600',
		'bg-blue-700',
		'bg-purple-600',
		'bg-slate-500',
		'bg-pink-500',
		'bg-indigo-500',
		'bg-teal-500'
	];

	let coloursWithinRange = colours.slice(0, numberOfColours);

	export let active: boolean;
	export let colour: string;
	export let isSelected: boolean;
	export let id: string;
	export let toggleSelect: (id: string | null) => void;

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	const selectColour = (colourOption: string) => {
		colour = colourOption;
		dispatch('colourChange', { id, colour: colourOption });
	};
</script>

{#if active}
	<div class="flex flex-col items-center">
		<button
			class="rounded-full h-9 sm:h-14 w-9 sm:w-14 {colour} {isSelected
				? 'border-4 relative border-cyan-300 '
				: 'border-4 border-slate-800 hover:border-2 hover:border-black  '} "
			tabindex="0"
			on:click
		/>
		{#if isSelected}
			<div
				transition:slide={{ delay: 50, duration: 300, axis: 'x', easing: quintOut }}
				class=" w-0 h-0 z-40
		border-l-[10px] border-l-transparent
		border-b-[20px] border-b-slate-200
		border-r-[10px] border-r-transparent absolute top-full -mt-4"
			/>{/if}
	</div>
{:else}
	<button
		class="h-9 sm:h-14 w-9 sm:w-14 rounded-full border-4 border-slate-800 {colour}"
		disabled
	/>
{/if}
{#if isSelected}
	<div
		in:fade={{ duration: 150 }}
		out:fade={{ duration: 100 }}
		class="absolute top-20 sm:top-24 left-0 w-full z-10 bg-slate-200 border-4 border-black grid grid-cols-3 gap-x-2"
	>
		{#each coloursWithinRange as colourOption}
			<div class="flex justify-center p-4">
				<button
					class=" h-10 w-10 hover:border-2 hover:border-black flex flex-col items-center"
					on:click={(e) => {
						selectColour(colourOption);
						toggleSelect(null);
					}}
				>
					<div class="{colourOption} h-4 w-5 rounded-t-xl" />
					<div class="{colourOption}  h-5 w-2" /></button
				>
			</div>
		{/each}
	</div>
{/if}

<style>
	.peg-shape {
		border-radius: 50% 50% 0 0;
	}
</style>
