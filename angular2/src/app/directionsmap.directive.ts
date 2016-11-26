import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core/services/google-maps-api-wrapper';
import { Directive, Input} from '@angular/core';

import { Location, Route } from './location';

declare var google: any;

@Directive({
    selector: 'sebm-google-map-directions'
})

export class DirectionsMapDirective {
    @Input() initRoute: Route;

	static directionDisplays: any;
	static durations: number[];
	static distances: number[];

    constructor (private gmapsApi: GoogleMapsAPIWrapper) {}

    ngOnInit(){
		DirectionsMapDirective.directionDisplays = [];
		DirectionsMapDirective.durations = [];
		DirectionsMapDirective.distances = [];

		this.newDirection(this.initRoute);
    }

	//TODO Way to make this non-static?
	static getDisplays(map: any): any {
		//TODO Change this magic number later
		if (DirectionsMapDirective.directionDisplays.length <= 0) {
			for (let i = 0; i < 3; i++) {
				let display = new google.maps.DirectionsRenderer;
				display.setMap(map);
				DirectionsMapDirective.directionDisplays[i] = display;
			}
		}
		return DirectionsMapDirective.directionDisplays;
	}

	newDirection(route: Route) {
        this.gmapsApi.getNativeMap().then(map => {
			let directionsService = new google.maps.DirectionsService;
			let directionDisplays = DirectionsMapDirective.getDisplays(map);

			let distances = DirectionsMapDirective.distances;
			let durations = DirectionsMapDirective.durations;
			distances.length = 0;
			durations.length = 0;
			
			//TODO Yeah for magic numbers!
			for (let i = 0; i < 3; i++) {
				directionsService.route({
					origin: {lat: route.origin.lat, lng: route.origin.lng},
					destination: {lat: route.destination.lat, lng: route.destination.lng},
					waypoints: [],
					optimizeWaypoints: true,
					travelMode: i == 0 ? 'DRIVING' : 'TRANSIT', //Ugh
					transitOptions: i == 1 ? { modes: ['BUS'] } : { modes: ['TRAIN'] }//Ugh
				}, function(direction, status) {
					if (status === 'OK') {
						let totalDistance = 0;
						let totalDuration = 0;
						let legs = direction.routes[0].legs;
						for(let i = 0; i < legs.length; i++) {
							totalDistance += legs[i].distance.value;
							totalDuration += legs[i].duration.value;
						}
						distances.push(totalDistance);
						durations.push(totalDuration);
						directionDisplays[i].setDirections(direction);
					} else {
						console.log('Directions request failed due to ' + status);
					}
				});
			}
        });
	}
}
