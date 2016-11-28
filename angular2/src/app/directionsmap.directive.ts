import { Directive, Input} from '@angular/core';

import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core/services/google-maps-api-wrapper';

import { Location, Route } from './location';
import { Observable } from "rxjs/Observable";

declare var google: any;

@Directive({
    selector: 'google-map-directions',
})

export class DirectionsMapDirective {
    @Input() initRoute: Route;

    directionDisplays: any;
    durations: any[];
    distances: any[];

    constructor (private gmapsApi: GoogleMapsAPIWrapper) {}

    ngOnInit(){
        this.durations = [];
        this.distances = [];

        this.newDirection(this.initRoute);
    }

    newDirection(route: Route) {
        this.gmapsApi.getNativeMap().then(map => {
            let directionsService = new google.maps.DirectionsService;
            let directionDisplays = this.getDisplays(map);

            let options = {
                origin: {lat: route.origin.lat, lng: route.origin.lng},
                destination: {lat: route.destination.lat, lng: route.destination.lng},
                waypoints: [],
                optimizeWaypoints: true,
                travelMode: route.types[0].mode,
                transitOptions: { modes: route.types[0].modeTypes }
            }

            //TODO Callback functions for durations and distances
            const calculate = (direction, status, origin) => {
                if (status === 'OK') {
                    let leg = direction.routes[0].legs[0];
                    if (origin) {
                        this.distances[0] = leg.distance;
                        this.durations[0] = leg.duration;
                        directionDisplays[0].setDirections(direction);
                    } else {
                        this.distances[1] = leg.distance;
                        this.durations[1] = leg.duration;
                        directionDisplays[1].setDirections(direction);
                    }
                } else {
                    console.log('Directions request failed due to ' + status);
                }
            }

            directionsService.route(options, (directions, status) => { calculate(directions, status, true) });

            options.origin = { lat: route.origin.lat, lng: route.origin.lng };
            options.destination = { lat: route.destination.lat, lng: route.destination.lng };
            options.travelMode = route.types[1].mode;
            options.transitOptions = { modes: route.types[1].modeTypes };

            directionsService.route(options, (directions, status) => { calculate(directions, status, false) });
        });
    }

    private getDisplays(map: any): any {
        if (!this.directionDisplays) {
			this.directionDisplays = [];
            for (let i = 0; i < 2; i++) {
                let display = new google.maps.DirectionsRenderer;
                display.setMap(map);
                this.directionDisplays.push(display);
            }
        }
        return this.directionDisplays;
    }

}
