<script lang="ts">
	export let numberOfAttempts: number;
	export let numberOfColours: number;
	export let updateNumberOfColours: (event: Event) => void;
	export let updateAttempts: (event: Event) => void;
	export let resetGame: () => void;
	let isOpen = false;

	import { slide, fade } from 'svelte/transition';

	const selectTextOnFocus = (node: HTMLInputElement) => {
		const handleFocus = (_event: FocusEvent) => {
			node && typeof node.select === 'function' && node.select();
		};

		node.addEventListener('focus', handleFocus);

		return {
			destroy() {
				node.removeEventListener('focus', handleFocus);
			}
		};
	};

	const toggleOpen = () => {
		isOpen = !isOpen;
	};
</script>

<div class="bg-orange-700 border-2 border-black">
	<button
		on:click={toggleOpen}
		out:fade={{ duration: 100 }}
		class="flex justify-center w-full items-center gap-2 bg-green-500 {isOpen
			? 'border-b-2'
			: ''} border-black p-4"
	>
		<h2 class="font-bold text-2xl">Settings</h2>
		<div
			class="h-7 w-7 rounded-full bg-slate-400 flex justify-center items-center border-2 border-black"
		>
			{#if isOpen}
				<span class="mb-[1px]">&#x25B2;</span>
			{:else}
				<span class="mt-[1px]">&#x25BC;</span>
			{/if}
		</div>
	</button>

	{#if isOpen}
		<div
			in:slide={{ duration: 400 }}
			out:slide={{ duration: 200 }}
			class="space-y-6 p-4 bg-orange-300"
		>
			<div class="flex flex-col sm:flex-row">
				<label class="font-bold w-24" for="attempts-slider">Attempts:</label>
				<div class="flex gap-2 items-center">
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
						class="w-10 text-center border-2 border-black"
						min="1"
						max="12"
						value={numberOfAttempts}
						use:selectTextOnFocus
						on:input={updateAttempts}
					/>
				</div>
			</div>
			<div class="flex flex-col sm:flex-row">
				<label class="font-bold w-24" for="colours-slider">Colours:</label>
				<div class="flex gap-2 items-center">
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
						class="w-10 text-center border-2 border-black"
						id="colours-input"
						min="2"
						max="9"
						value={numberOfColours}
						use:selectTextOnFocus
						on:input={updateNumberOfColours}
					/>
				</div>
			</div>
			<br />
			<button class="h-10 w-40 border-4 border-black bg-red-600 font-bold" on:click={resetGame}
				>Reset game</button
			>
		</div>
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
	}
	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 2.25rem;
		height: 2.25rem;
		border-radius: 50%;
		background: #22c55e;
		opacity: 0.9;
		cursor: pointer;
	}

	input[type='range']::-moz-range-thumb {
		width: 25px;
		height: 25px;
		border-radius: 50%;
		background: #22c55e;
		cursor: pointer;
	}
</style>
