// I started off by defining the types. Makes it easier for me to think about what I'm working with.

// This involved curling the commands initially to see what the API returned, and then defining the types based on that.

export type JellyfaasToken = {
	token: string;
	expiry: string;
};

export type DashboardQuery = {
	station?: SpaceStation;
	artifact?: Artifact;
};

export type SpaceStation =
	| 'Alpha Centauri'
	| 'Beta Hydri'
	| 'Gamma Draconis'
	| 'Delta Pavonis'
	| 'Epsilon Indi'
	| 'all-stations';

export type Artifact =
	| 'Gold'
	| 'Silver'
	| 'Food Rations'
	| 'Water'
	| 'Medicine'
	| 'Steel'
	| 'Platinum'
	| 'Computer Chips'
	| 'Fuel Cells'
	| 'Alien Artifacts'
	| 'Spice'
	| 'Rare Gems'
	| 'all-artifacts';

export type JellyfaasApiQuery = {
	station?: SpaceStation;
	artifact?: Artifact;
	historic?: boolean;
};

export type ArtifactWithPrice = {
	name: Artifact;
	history: number[];
	price: number;
};

export type StationWithArtifacts = {
	name: SpaceStation;
	artifacts: ArtifactWithPrice[];
};

export type ArtifactWithHistory = {
	name: Artifact;
	prices: {
		// This is what I wanted the data structure to be as it would be easier to work with rather than price & history
		date: string;
		price: number;
	}[];
};

export type StationWithArtifactsHistory = {
	name: SpaceStation;
	artifacts: ArtifactWithHistory[];
};
