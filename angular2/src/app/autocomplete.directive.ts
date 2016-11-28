import { Directive, ElementRef, Input } from '@angular/core';

import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core/services/google-maps-api-wrapper';

import { Location, Route } from './location';

declare var google: any;

@Directive({
    selector: 'google-autocomplete',
})

export class AutoCompleteDirective {
	@Input() element: any;
	@Input() origin: boolean;
	@Input() completeFunction: any;

    constructor (private gmapsApi: GoogleMapsAPIWrapper) {}

    ngOnInit() {
        this.gmapsApi.getNativeMap().then((map) => {
			let autocomplete = new google.maps.places.Autocomplete(this.element, {types: ['geocode']});
			let origin = this.origin;
			autocomplete.addListener('place_changed', () => { 
				this.completeFunction.getAddress(autocomplete, origin); } );
		});
    }
}
