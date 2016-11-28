export class Location {
    lat: number;
    lng: number;
}

export class TransportType {
	mode: string;
	modeTypes: string[];
}

export class Route {
    origin: Location;
    destination: Location;
	types: TransportType[];
}

export class StringResults {
	mode: string;
	distance: string;
	duration: string;
	efficiency: number;
	moreEfficient: boolean;
}
