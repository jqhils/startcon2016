export class Location {
    name: string;
    lat: number;
    lng: number;
}

export class Route {
    origin: Location;
    destination: Location;
}
