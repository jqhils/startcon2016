import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core/services/google-maps-api-wrapper';
import { Directive, Input} from '@angular/core';

import { Location, Route } from './location';

declare var google: any;

@Directive({
    selector: 'sebm-google-map-directions'
})

export class DirectionsMapDirective {
    @Input() origin: Location;
    @Input() destination: Location;

	static directionsService: any;
	static directionsDisplay: any;

    constructor (private gmapsApi: GoogleMapsAPIWrapper) {}

    ngOnInit(){
        this.gmapsApi.getNativeMap().then(map => {
            DirectionsMapDirective.directionsService = new google.maps.DirectionsService;
            DirectionsMapDirective.directionsDisplay = new google.maps.DirectionsRenderer;
            DirectionsMapDirective.directionsDisplay.setMap(map);
            DirectionsMapDirective.directionsService.route({
                origin: {lat: this.origin.lat, lng: this.origin.lng},
                destination: {lat: this.destination.lat, lng: this.destination.lng},
                waypoints: [],
                optimizeWaypoints: true,
                travelMode: 'DRIVING'
            }, function(response, status) {
                if (status === 'OK') {
                    DirectionsMapDirective.directionsDisplay.setDirections(response);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });

        });
    }

	newDirection(route: Route) {
        this.gmapsApi.getNativeMap().then(map => {
            DirectionsMapDirective.directionsDisplay.setMap(map);
            DirectionsMapDirective.directionsService.route({
                origin: {lat: route.origin.lat, lng: route.origin.lng},
                destination: {lat: route.destination.lat, lng: route.destination.lng},
                waypoints: [],
                optimizeWaypoints: true,
                travelMode: 'DRIVING'
            }, function(response, status) {
                if (status === 'OK') {
                    DirectionsMapDirective.directionsDisplay.setDirections(response);
                } else {
                    console.log('Directions request failed due to ' + status);
                }
            });
        });
	}
}
