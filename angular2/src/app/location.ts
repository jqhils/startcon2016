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
	typeA: TransportType;
	typeB: TransportType;
}
