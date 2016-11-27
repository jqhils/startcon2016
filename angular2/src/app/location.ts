export class Location {
    lat: number;
    lng: number;
}

export class Route {
    place: string;
    origin: Location;
    destination: Location;
}
