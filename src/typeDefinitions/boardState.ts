export type Colour =
	| 'bg-green-600'
	| 'bg-red-600'
	| 'bg-purple-600'
	| 'bg-yellow-400'
	| 'bg-blue-700'
	| 'bg-slate-500'
	| 'bg-orange-200'
	| 'bg-pink-500'
	| 'bg-indigo-500'
	| 'bg-teal-500'
	| 'deleted';

export interface PegType {
	colour: Colour;
	id: string;
}

export interface Response {
	correctPlacement: number;
	correctColour: number;
}

export interface RowData {
	active: boolean;
	id: string;
	response: Response;
	pegs: PegType[];
}

export type BoardState = RowData[];

export type ColourChangeEvent = {
	detail: {
		id: string;
		colour: Colour;
	};
};
export type ResponseChangeEvent = {
	detail: {
		id: string;
		correctPlacement: number;
		correctColour: number;
	};
};
