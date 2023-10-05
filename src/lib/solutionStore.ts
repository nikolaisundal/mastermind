import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { Colour } from '../typeDefinitions/boardState';

export const solutionStore: Writable<Colour[]> = writable([]);
