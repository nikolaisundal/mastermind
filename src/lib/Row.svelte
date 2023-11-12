<script lang="ts">
	import type { RowData, PegType } from '../typeDefinitions/boardState';
	import Peg from './Peg.svelte';
	import { solutionStore } from '$lib/solutionStore';
	import { slide, fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	export let row: RowData;

	export let setQuickStartInvisible: () => void;

	const dispatch = createEventDispatcher();

	let selectedPegId: null | string = null;

	function toggleSelect(id: null | string) {
		setQuickStartInvisible();
		selectedPegId = selectedPegId === id ? null : id;
	}
	let notEnoughPlacements: boolean;

	$: {
		notEnoughPlacements = row.pegs.some((peg) => peg.colour === 'bg-orange-200');
	}

	let correctPlacement: number = row.response.correctPlacement;
	let correctColour: number = row.response.correctColour;

	$: selectedPegId;

	const makeArray = (length: number): any[] => Array.from({ length });

	$: empty = 4 - (correctPlacement + correctColour);

	const makeAttempt = () => {
		let newCorrectPlacement = 0;
		let newCorrectColour = 0;
		let solutionCopy = [...$solutionStore];

		let pegsCopy = JSON.parse(JSON.stringify(row.pegs));
		if (notEnoughPlacements) {
			return console.log('place four pegsz');
		}

		pegsCopy.forEach((peg: PegType, index: number) => {
			let correctPeg = solutionCopy[index];
			if (peg.colour === correctPeg) {
				newCorrectPlacement++;
				solutionCopy[index] = 'bg-orange-200';
				peg.colour = 'deleted';
			}
		});

		pegsCopy.forEach((peg: PegType) => {
			let colourMatchIndex = solutionCopy.indexOf(peg.colour);
			if (colourMatchIndex !== -1) {
				newCorrectColour++;
				solutionCopy[colourMatchIndex] = 'bg-orange-200';
				peg.colour = 'deleted';

				return;
			}
		});

		correctPlacement = newCorrectPlacement;
		correctColour = newCorrectColour;

		dispatch('updateResponse', { id: row.id, correctPlacement, correctColour });
	};
</script>

<!-- orange-700 -->
<div
	class="{row.active
		? 'bg-orange-500'
		: 'bg-[#a5583a]'}  flex gap-4 sm:gap-6 h-20 sm:h-24 border-2 border-slate-800"
>
	<div class="sm:flex items-center hidden font-bold">
		<header class="pl-1">Guess:</header>
	</div>

	<div class="flex gap-4 items-center relative pl-4">
		{#each row.pegs as peg (peg.id)}
			<Peg
				colour={peg.colour}
				active={row.active}
				isSelected={selectedPegId === peg.id}
				id={peg.id}
				{toggleSelect}
				on:click={() => toggleSelect(peg.id)}
				on:keydown={() => toggleSelect(peg.id)}
				on:colourChange
			/>
		{/each}
	</div>

	<header class="sm:flex items-center hidden font-bold">Response:</header>

	{#if !row.active}
		<div
			in:fade={{ delay: 300, duration: 500 }}
			class="grid grid-cols-2 items-center justify-center"
		>
			{#each makeArray(correctPlacement) as _}
				<div
					class="h-4 w-4 mx-4 sm:h-7 sm:w-7 bg-red-600 rounded-full flex justify-center items-center border-2 sm:border-4 border-slate-900"
				>
					<div class="h-3 w-3 sm:border-2 border-slate-800 rounded-full bg-red-700" />
				</div>
			{/each}

			{#each makeArray(correctColour) as _}
				<div
					class="h-4 w-4 mx-4 sm:h-7 sm:w-7 bg-slate-100 rounded-full flex justify-center items-center border-2 sm:border-4 border-slate-900"
				>
					<div class="h-3 w-3 sm:border-2 border-slate-800 rounded-full bg-slate-200" />
				</div>
			{/each}

			{#each makeArray(empty) as _}
				<div
					class="h-4 w-4 sm:h-7 sm:w-7 mx-4 flex justify-center items-center bg-orange-900 rounded-full"
				>
					<div class="h-4 w-4 border-2 border-slate-800 rounded-full bg-orange-300" />
				</div>
			{/each}
		</div>
	{:else}
		<div class="h-full w-[88px] sm:w-[120px] flex justify-center items-center">
			<button
				class="h-2/4 w-3/4 border-4 {notEnoughPlacements
					? 'bg-green-500 text-slate-600 border-slate-500'
					: 'bg-green-500 border-black'}"
				on:click={makeAttempt}
				disabled={notEnoughPlacements}
			>
				<div class="flex flex-col items-center font-bold">Check</div>
			</button>
		</div>
	{/if}
</div>
