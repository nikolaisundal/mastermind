<script lang="ts">
	import Row from '../lib/Row.svelte';
	import type {
		ResponseChangeEvent,
		ColourChangeEvent,
		BoardState,
		Colour
	} from '../typeDefinitions/boardState';
	import { solutionStore } from '$lib/solutionStore';

	const colours = [
		'bg-red-600',
		'bg-yellow-400',
		'bg-green-600',
		'bg-blue-700',
		'bg-purple-600',
		'bg-slate-500'
	];

	const generateRandomSolution = (): Colour[] => {
		let solution: Colour[] = [];
		for (let i = 0; i < 4; i++) {
			const randomIndex = Math.floor(Math.random() * colours.length);
			const randomColour = colours[randomIndex] as Colour;
			solution.push(randomColour);
		}

		return solution;
	};

	solutionStore.set(generateRandomSolution());

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
		boardState = boardState.map((row, index) => {
			if (row.id === id) {
				return {
					...row,
					response: { correctPlacement, correctColour },
					active: false
				};
			} else if (index === boardState.findIndex((r) => r.id === id) - 1) {
				// if the current row is the one before the active row, set active to true
				return { ...row, active: true };
			}
			return row; // return the row unchanged if it's not the active row or the one before it
		});
	};

	$: console.log('SolutionStore', $solutionStore);

	let boardState: BoardState = [
		{
			active: false,
			id: crypto.randomUUID(),
			response: {
				correctPlacement: 0,
				correctColour: 0
			},
			pegs: [
				{
					colour: 'bg-orange-200',
					id: crypto.randomUUID()
				},
				{
					colour: 'bg-orange-200',
					id: crypto.randomUUID()
				},
				{
					colour: 'bg-orange-200',
					id: crypto.randomUUID()
				},
				{
					colour: 'bg-orange-200',
					id: crypto.randomUUID()
				}
			]
		},
		{
			active: false,
			id: crypto.randomUUID(),
			response: {
				correctPlacement: 0,
				correctColour: 0
			},
			pegs: [
				{
					colour: 'bg-orange-200',
					id: crypto.randomUUID()
				},
				{
					colour: 'bg-orange-200',
					id: crypto.randomUUID()
				},
				{
					colour: 'bg-orange-200',
					id: crypto.randomUUID()
				},
				{
					colour: 'bg-orange-200',
					id: crypto.randomUUID()
				}
			]
		},
		{
			active: false,
			id: crypto.randomUUID(),
			response: {
				correctPlacement: 0,
				correctColour: 0
			},
			pegs: [
				{
					colour: 'bg-orange-200',
					id: crypto.randomUUID()
				},
				{
					colour: 'bg-orange-200',
					id: crypto.randomUUID()
				},
				{
					colour: 'bg-orange-200',
					id: crypto.randomUUID()
				},
				{
					colour: 'bg-orange-200',
					id: crypto.randomUUID()
				}
			]
		},
		{
			active: false,
			id: crypto.randomUUID(),
			response: {
				correctPlacement: 0,
				correctColour: 0
			},
			pegs: [
				{
					colour: 'bg-orange-200',
					id: crypto.randomUUID()
				},
				{
					colour: 'bg-orange-200',
					id: crypto.randomUUID()
				},
				{
					colour: 'bg-orange-200',
					id: crypto.randomUUID()
				},
				{
					colour: 'bg-orange-200',
					id: crypto.randomUUID()
				}
			]
		},
		{
			active: false,
			id: crypto.randomUUID(),
			response: {
				correctPlacement: 0,
				correctColour: 0
			},
			pegs: [
				{
					colour: 'bg-orange-200',
					id: crypto.randomUUID()
				},
				{
					colour: 'bg-orange-200',
					id: crypto.randomUUID()
				},
				{
					colour: 'bg-orange-200',
					id: crypto.randomUUID()
				},
				{
					colour: 'bg-orange-200',
					id: crypto.randomUUID()
				}
			]
		},
		{
			active: false,
			id: crypto.randomUUID(),
			response: {
				correctPlacement: 0,
				correctColour: 0
			},
			pegs: [
				{
					colour: 'bg-orange-200',
					id: crypto.randomUUID()
				},
				{
					colour: 'bg-orange-200',
					id: crypto.randomUUID()
				},
				{
					colour: 'bg-orange-200',
					id: crypto.randomUUID()
				},
				{
					colour: 'bg-orange-200',
					id: crypto.randomUUID()
				}
			]
		},
		{
			active: false,
			id: crypto.randomUUID(),
			response: {
				correctPlacement: 0,
				correctColour: 0
			},
			pegs: [
				{
					colour: 'bg-orange-200',
					id: crypto.randomUUID()
				},
				{
					colour: 'bg-orange-200',
					id: crypto.randomUUID()
				},
				{
					colour: 'bg-orange-200',
					id: crypto.randomUUID()
				},
				{
					colour: 'bg-orange-200',
					id: crypto.randomUUID()
				}
			]
		},
		{
			active: false,
			id: crypto.randomUUID(),
			response: {
				correctPlacement: 0,
				correctColour: 0
			},
			pegs: [
				{
					colour: 'bg-orange-200',
					id: crypto.randomUUID()
				},
				{
					colour: 'bg-orange-200',
					id: crypto.randomUUID()
				},
				{
					colour: 'bg-orange-200',
					id: crypto.randomUUID()
				},
				{
					colour: 'bg-orange-200',
					id: crypto.randomUUID()
				}
			]
		},
		{
			active: false,
			id: crypto.randomUUID(),
			response: {
				correctPlacement: 0,
				correctColour: 0
			},
			pegs: [
				{
					colour: 'bg-orange-200',
					id: crypto.randomUUID()
				},
				{
					colour: 'bg-orange-200',
					id: crypto.randomUUID()
				},
				{
					colour: 'bg-orange-200',
					id: crypto.randomUUID()
				},
				{
					colour: 'bg-orange-200',
					id: crypto.randomUUID()
				}
			]
		},
		{
			active: true,
			id: crypto.randomUUID(),
			response: {
				correctPlacement: 0,
				correctColour: 0
			},
			pegs: [
				{
					colour: 'bg-orange-200',
					id: crypto.randomUUID()
				},
				{
					colour: 'bg-orange-200',
					id: crypto.randomUUID()
				},
				{
					colour: 'bg-orange-200',
					id: crypto.randomUUID()
				},
				{
					colour: 'bg-orange-200',
					id: crypto.randomUUID()
				}
			]
		}
	];
	/* $: console.log('boardstate:', boardState); */
</script>

<h1 class="font-bold text-center py-10">M A S T E R M I N D</h1>
<div class="bg-slate-100 max-w-xs sm:max-w-screen-sm mx-auto border-2 border-slate-900">
	<h1>hei</h1>
	{#each boardState as row (row.id)}
		<Row {row} on:colourChange={handleColourChange} on:updateResponse={handleUpdateResponse} />
	{/each}
</div>
<div class="h-96 bg-amber-100 flex justify-center items-end w-full"><p>Craated by me</p></div>
