<script lang="ts">
	import Row from '../lib/Row.svelte';
	import type {
		ResponseChangeEvent,
		ColourChangeEvent,
		BoardState,
		Colour
	} from '../typeDefinitions/boardState';
	import { solutionStore } from '$lib/solutionStore';
	import { settingsStore } from '$lib/settingsStore';

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

	let game: string = 'playing';

	let boardState: BoardState;

	let numberOfAttempts: number = 10;
	let numberOfColours: number = 6;

	$: {
		numberOfAttempts = $settingsStore.numberOfAttempts;
		numberOfColours = $settingsStore.numberOfColours;
		boardState = generateBoardState(numberOfAttempts);
	}

	const generateRandomSolution = (): Colour[] => {
		let solution: Colour[] = [];
		let coloursWithinRange = colours.slice(0, numberOfColours);
		console.log('Hello in here', numberOfColours);
		for (let i = 0; i < 4; i++) {
			const randomIndex = Math.floor(Math.random() * coloursWithinRange.length);
			const randomColour = coloursWithinRange[randomIndex] as Colour;
			solution.push(randomColour);
		}

		return solution;
	};

	solutionStore.set(generateRandomSolution());

	function generateRow(isActive: boolean) {
		return {
			active: isActive,
			id: crypto.randomUUID(),
			response: {
				correctPlacement: 0,
				correctColour: 0
			},
			pegs: [
				{ colour: 'bg-orange-200' as Colour, id: crypto.randomUUID() },
				{ colour: 'bg-orange-200' as Colour, id: crypto.randomUUID() },
				{ colour: 'bg-orange-200' as Colour, id: crypto.randomUUID() },
				{ colour: 'bg-orange-200' as Colour, id: crypto.randomUUID() }
			]
		};
	}

	function generateBoardState(numberOfAttempts: number) {
		return Array.from({ length: numberOfAttempts }, (_, index) => {
			let isActive = index === numberOfAttempts - 1;
			return generateRow(isActive);
		});
	}

	boardState = generateBoardState(numberOfAttempts);

	/* solutionStore.set(['bg-blue-700', 'bg-blue-700', 'bg-red-600', 'bg-green-600']); */
	/*  blue, grey, green, red  */
	const handleColourChange = (event: ColourChangeEvent) => {
		const { id, colour } = event.detail;
		boardState = boardState.map((row) => {
			const pegIndex = row.pegs.findIndex((peg) => peg.id === id);

			if (pegIndex !== -1) {
				return {
					...row,
					pegs: row.pegs.map((peg, index) => (index === pegIndex ? { ...peg, colour } : peg))
				};
			}

			return row;
		});
	};

	const handleUpdateResponse = (event: ResponseChangeEvent) => {
		const { id, correctPlacement, correctColour } = event.detail;

		const nextRow = boardState.findIndex((r) => r.id === id) - 1;

		boardState = boardState.map((row, index) => {
			if (correctPlacement === 4) {
				game = 'won';
				return { ...row, active: false };
			} else if (nextRow === -1) {
				game = 'over';
				return { ...row, active: false };
			} else if (index === nextRow) {
				return { ...row, active: true };
			}

			if (row.id !== id) {
				return row;
			}

			return {
				...row,
				response: { correctPlacement, correctColour },
				active: false
			};
		});
	};

	function updateAttempts(event: Event) {
		const input = event.target as HTMLInputElement; // Type assertion for better type safety
		let value = +input.value; // Convert string to number

		// Clamp the value to the range 1 to 12
		value = Math.max(1, Math.min(value, 12));

		settingsStore.update((settings) => {
			settings.numberOfAttempts = value;
			return settings;
		});
		solutionStore.set(generateRandomSolution());
		boardState = generateBoardState(value);
	}

	const updateNumberOfColours = (event: Event) => {
		const input = event.target as HTMLInputElement;
		let value = +input.value;
		value = Math.max(2, Math.min(value, 9));
		settingsStore.update((settings) => {
			console.log('Before update:', settings);
			settings.numberOfColours = value;
			console.log('After update:', settings);
			return settings;
		});
		solutionStore.set(generateRandomSolution());
		boardState = generateBoardState(value);
	};

	$: console.log('SolutionStore', $solutionStore);
</script>

<h1 class="font-bold text-center py-10">M A S T E R M I N D</h1>
<div class="bg-slate-100 max-w-xs sm:max-w-screen-sm mx-auto border-2 border-slate-900">
	<div class="space-y-4 p-4">
		<div>
			<label for="attempts-slider">attempts:</label>
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

		<div>
			<label for="colours-slider">colours:</label>
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

		<button
			class="h-2/4 w-3/4 border-4"
			on:click={() => {
				boardState = generateBoardState(numberOfAttempts);
				game = 'playing';
				solutionStore.set(generateRandomSolution());
			}}>Try again</button
		>
	</div>

	{#each boardState as row (row.id)}
		<Row {row} on:colourChange={handleColourChange} on:updateResponse={handleUpdateResponse} />
	{/each}

	{#if game !== 'playing'}
		<div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
			<div class="bg-white rounded-lg p-4">
				<button class="absolute top-4 right-4" on:click={() => (game = 'playing')}>X</button>
				<div class="h-48 bg-pink-300 flex flex-col justify-center items-center space-y-4">
					<span> {game === 'won' ? 'congratz' : 'fu'}</span>
					<span> The solution was:</span>
					<div class="flex gap-4 items-center">
						{#each $solutionStore as pegColour, index (index)}
							<button
								class="h-9 sm:h-14 w-9 sm:w-14 rounded-full border-4 border-slate-800 {pegColour}"
								disabled
							/>
						{/each}
					</div>
					<div class="w-32 bg-purple-700 flex justify-between">
						<button on:click={() => (game = 'playing')}>Ok</button>
						<button
							on:click={() => {
								boardState = generateBoardState(numberOfAttempts);
								game = 'playing';
								solutionStore.set(generateRandomSolution());
							}}>Try again</button
						>
					</div>
				</div>
			</div>
		</div>
	{/if}
	<div class="flex justify-between">
		<h1>hei</h1>
		<a
			href="https://www.wikihow.com/Play-Mastermind"
			target="_blank"
			rel="noopener noreferrer"
			class="underline"
		>
			how to play Mastermind
		</a>
	</div>
</div>

<div class="h-96 bg-amber-100 flex justify-center items-end w-full"><p>Craated by me</p></div>

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
		width: 100%;
		max-width: 200px;
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
