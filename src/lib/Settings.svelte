<script lang="ts">
	export let numberOfAttempts: number;
	export let numberOfColours: number;
	export let updateNumberOfColours: (event: Event) => void;
	export let updateAttempts: (event: Event) => void;
	export let resetGame: () => void;
	let isOpen = true;

	import { slide, fade } from 'svelte/transition';

	const toggleOpen = () => {
		isOpen = !isOpen;
	};
</script>

<div class="bg-orange-700 border-2 border-black">
	<div
		out:fade={{ duration: 100 }}
		class="flex justify-center items-center gap-2 bg-green-500 {isOpen
			? 'border-b-2'
			: ''} border-black p-4"
	>
		<h2 class="font-bold text-2xl">Settings</h2>
		<button
			class="h-6 w-6 rounded-full bg-slate-400 flex justify-center align-center mt-1"
			on:click={toggleOpen}
			>{#if isOpen}
				<span class="leading-tight">&#x25B2;</span> <!-- Up arrow when isOpen is true -->
			{:else}
				<span class="">&#x25BC;</span> <!-- Down arrow when isOpen is false -->
			{/if}</button
		>
	</div>

	{#if isOpen}
		<div in:slide={{ duration: 400 }} out:slide={{ duration: 200 }} class="space-y-4 p-4">
			<div class="flex flex-col sm:flex-row">
				<label class="font-bold w-24 bg-white" for="attempts-slider">Attempts:</label>
				<div class="flex gap-2">
					<input
						class=""
						type="range"
						id="attempts-slider"
						min="1"
						max="12"
						step="1"
						value={numberOfAttempts}
						on:input={updateAttempts}
					/>
					<input
						type="number"
						id="attempts-input"
						min="1"
						max="12"
						value={numberOfAttempts}
						on:input={updateAttempts}
					/>
				</div>
			</div>
			<div class="flex flex-col sm:flex-row">
				<label class="font-bold w-24 bg-white" for="colours-slider">colours:</label>
				<div class="flex gap-2">
					<input
						type="range"
						id="colours-slider"
						min="2"
						max="9"
						step="1"
						value={numberOfColours}
						on:input={updateNumberOfColours}
					/>
					<input
						type="number"
						id="colours-input"
						min="2"
						max="9"
						value={numberOfColours}
						on:input={updateNumberOfColours}
					/>
				</div>
			</div>
			<button class="h-10 w-40 border-4 font-bold" on:click={resetGame}>Reset game</button>
		</div>
	{:else}
		<div />
	{/if}
</div>

<style>
	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	input[type='number'] {
		-moz-appearance: textfield;
		appearance: textfield;
	}
	input[type='range'] {
		appearance: none;
		-webkit-appearance: none;
		width: 200px;
		max-width: 300px;
		height: 15px;
		border-radius: 5px;
		background: #d3d3d3;
		outline: none;
		opacity: 0.7;
		-webkit-transition: 0.2s;
		transition: opacity 0.2s;
	}
	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 2.25rem;
		height: 2.25rem;
		border-radius: 50%;
		background: #04aa6d;
		cursor: pointer;
	}

	input[type='range']::-moz-range-thumb {
		width: 25px;
		height: 25px;
		border-radius: 50%;
		background: #04aa6d;
		cursor: pointer;
	}
</style>
