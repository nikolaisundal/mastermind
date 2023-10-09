import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

interface SettingsType {
	numberOfAttempts: number;
	numberOfColours: number;
}

export const settingsStore: Writable<SettingsType> = writable({
	numberOfAttempts: 10,
	numberOfColours: 6
});
