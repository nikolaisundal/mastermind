<script lang="ts">
	let isOpen = false;

	import { slide } from 'svelte/transition';

	const toggleOpen = () => {
		isOpen = !isOpen;
	};
</script>

<button
	on:click={toggleOpen}
	class="flex justify-center items-center w-full p-4 gap-2 bg-green-500 border-black border-2 {isOpen
		? 'border-b-0'
		: ''}"
>
	<h2 class="font-bold text-2xl">How to Play</h2>
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
		in:slide={{ duration: 500 }}
		out:slide={{ duration: 350 }}
		class="flex border-t-2 border-black flex-col p-4 bg-orange-300"
	>
		<h2 class="text-xl font-semibold mb-3">Objective</h2>
		<p class="mb-4">
			Deduce the secret code consisting of a sequence of colors. The code can be made up of any
			combination of the available colors. Your goal is to figure out the correct sequence within
			the specified number of attempts.
		</p>

		<h2 class="text-xl font-semibold mb-3">Setup</h2>
		<ol class="list-decimal pl-5 mb-4">
			<li class="mb-2">
				The Codemaker (the computer in this version) sets a secret code that the Codebreaker
				(player) needs to deduce.
			</li>
			<li>
				Choose the number of attempts (1-12) and the number of colors (2-9) in the settings, based
				on your preference or skill level.
			</li>
		</ol>

		<h2 class="text-xl font-semibold mb-3">How to Play</h2>
		<ol class="list-decimal pl-5 mb-4">
			<li class="mb-2">
				<b>Make an attempt:</b> Start by selecting a sequence of colors as your guess for the secret
				code. The sequence's length is determined by the number of colors you've set in the settings.
			</li>
			<li class="mb-2">
				<b>Submit Your Guess:</b> Once you've selected a sequence, submit your guess to receive feedback
				from the Codemaker.
			</li>
			<li class="mb-2">
				<b>Interpreting Feedback:</b> After each guess, the Codemaker will provide feedback using
				small pegs:
				<ul class="list-disc pl-5 mt-2">
					<li class="mb-1">
						<span class="text-red-700 font-bold">Red Peg</span><b>:</b> One of your pegs is the correct
						color and in the correct position.
					</li>
					<li class="mb-1">
						<span class="text-slate-100 font-bold">White Peg</span><b>:</b> One of your pegs is the correct
						color, but it is in the wrong position.
					</li>
					<li>No Peg: One of your pegs is not present in the secret code.</li>
				</ul>
				Note: The feedback pegs will not be in any particular order and won't directly correlate with
				the positions of the pegs in your guess.
			</li>
			<li class="mb-2">
				<b>Making Another Guess:</b> Using the feedback, attempt to deduce the secret code. With each
				subsequent guess, try to get closer to the correct sequence.
			</li>
			<li class="mb-2">
				<b>Winning the Game:</b> If you guess the correct sequence within the specified number of attempts,
				you win the game.
			</li>
			<li>
				<b>Losing the Game:</b> If you fail to guess the secret code within the number of attempts set,
				you lose. The Codemaker will then reveal the secret code.
			</li>
		</ol>
		<a
			href="https://www.wikihow.com/Play-Mastermind"
			target="_blank"
			rel="noopener noreferrer"
			class="underline"
		>
			Advanced guide
		</a>
	</div>
{/if}
