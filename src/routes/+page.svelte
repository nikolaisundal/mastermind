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
	import Settings from '$lib/Settings.svelte';
	import HowToPlay from '$lib/HowToPlay.svelte';
	import { slide, fade } from 'svelte/transition';

	const colours = [
		'bg-red-600',
		'bg-yellow-400',
		'bg-green-600',
		'bg-blue-700',
		'bg-purple-600',
		'bg-slate-500',
		'bg-pink-500',
		'bg-slate-800',
		'bg-teal-500'
	];

	let isOpen = false;

	let quickStartVisible = true;

	let game: string = 'playing';

	let boardState: BoardState;

	let numberOfAttempts: number = 10;
	let numberOfColours: number = 6;

	$: {
		numberOfAttempts = $settingsStore.numberOfAttempts;
		numberOfColours = $settingsStore.numberOfColours;
		boardState = generateBoardState(numberOfAttempts);
		solutionStore.set(generateRandomSolution());
	}

	const generateRandomSolution = (): Colour[] => {
		let solution: Colour[] = [];
		let coloursWithinRange = colours.slice(0, numberOfColours);

		for (let i = 0; i < 4; i++) {
			const randomIndex = Math.floor(Math.random() * coloursWithinRange.length);
			const randomColour = coloursWithinRange[randomIndex] as Colour;
			solution.push(randomColour);
		}

		return solution;
	};

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

	const resetGame = () => {
		solutionStore.set(generateRandomSolution());
		boardState = generateBoardState(numberOfAttempts);
		game = 'playing';
	};

	function updateAttempts(event: Event) {
		const input = event.target as HTMLInputElement;
		let value = +input.value;

		value = Math.max(1, Math.min(value, 12));

		settingsStore.update((settings) => {
			settings.numberOfAttempts = value;
			return settings;
		});

		resetGame();
	}

	const updateNumberOfColours = (event: Event) => {
		const input = event.target as HTMLInputElement;
		let value = +input.value;
		value = Math.max(2, Math.min(value, 9));
		settingsStore.update((settings) => {
			settings.numberOfColours = value;
			return settings;
		});

		resetGame();
	};

	const toggleOpen = () => {
		isOpen = !isOpen;

		setTimeout(() => {
			const section = document.getElementById('targetSection');
			if (section && isOpen) {
				section.scrollIntoView({ behavior: 'smooth', block: 'center' });
			} else {
				console.error('Element with id "targetSection" not found');
			}
		}, 500);
	};

	const setQuickStartInvisible = () => {
		quickStartVisible = false;
	};

	$: console.log("Since you're a web dev cheating is allowed. The solution is:", $solutionStore);
</script>

<h1 class="font-bold text-center text-xl py-10">M A S T E R M I N D</h1>
<div class="h-48 bg-amber-100" />
<div class="bg-orange-700 max-w-xs sm:max-w-screen-sm mx-auto border-2 border-slate-900">
	<Settings
		{numberOfAttempts}
		{numberOfColours}
		{updateNumberOfColours}
		{updateAttempts}
		{resetGame}
	/>
	<button
		on:click={toggleOpen}
		class="flex justify-center items-center w-full p-4 gap-2 bg-green-500 border-black border-2 {isOpen
			? 'border-b-0'
			: ''}"
	>
		<h2 class="font-bold text-2xl">Play</h2>
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
		<div in:slide={{ duration: 500 }} out:slide={{ duration: 350 }}>
			{#each boardState as row (row.id)}
				<Row
					{setQuickStartInvisible}
					{row}
					on:colourChange={handleColourChange}
					on:updateResponse={handleUpdateResponse}
				/>
			{/each}
		</div>
		{#if quickStartVisible}
			<div in:fade={{ duration: 300 }} out:fade={{ duration: 50 }} class="relative">
				<div
					id="targetSection"
					class="h-96 sm:h-64 w-full bg-slate-200 border-2 border-black absolute top-0 right-0 z-40 flex flex-col text-center p-4 space-y-2"
				>
					<h2 class="font-bold text-xl">Quick start:</h2>
					<ul class="w-2/3 sm:w-1/2 mx-auto text-left">
						<li class="py-1">-Place four pegs in the slots above.</li>
						<li class="py-1">-Press check to get the response.</li>
						<li class="py-1">-White peg: Correct colour.</li>
						<li class="py-1">-Red peg: Correct colour and placement.</li>
						<li class="py-1">-No peg: Colour not in solution.</li>
					</ul>
				</div>
			</div>
		{/if}
	{/if}
	<HowToPlay />
	{#if game !== 'playing'}
		<div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
			<div class="bg-orange-300 rounded-lg p-4 max-w-xs border-4 border-black">
				<button class="absolute top-4 right-4 text-4xl" on:click={() => (game = 'playing')}
					>&times;</button
				>
				<div class="h-48 flex flex-col justify-center items-center space-y-4">
					<span> {game === 'won' ? 'Well done!' : "You're out of attempts!"}</span>
					<span> The solution was:</span>
					<div class="flex gap-4 items-center">
						{#each $solutionStore as pegColour, index (index)}
							<button
								class="h-9 sm:h-14 w-9 sm:w-14 rounded-full border-4 border-slate-800 {pegColour}"
								disabled
							/>
						{/each}
					</div>
					<div class="sm:h-10" />
					<div class="w-full flex justify-evenly gap-2">
						<button
							class="bg-green-500 border-4 border-black w-2/5"
							on:click={() => (game = 'playing')}>OK</button
						>
						<button
							class="bg-green-500 border-4 border-black w-2/5"
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
</div>

<div class="h-96 bg-amber-100" />
<div class="h-96 bg-amber-100" />
<div class="h-48 bg-amber-100" />
