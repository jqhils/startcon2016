import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { DirectionsMapDirective } from './directionsmap.directive';
import { MapService } from './map.service';
import { Location, Route } from './location';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
    private locationForm: FormGroup;
    private transportForm: FormGroup;

    private origin: Location;
    private destination: Location;

    private route: Route;
    private transport: any;

	private durations: number[];
	private distances: number[];

	@ViewChild(DirectionsMapDirective) directive;

    constructor(private mapService: MapService,
                private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.locationForm = this.formBuilder.group({
            origin: ["", Validators.required],
            destination: ["", Validators.required],
        });

        this.transportForm = this.formBuilder.group({
            typeA: ["", Validators.required],
            typeB: ["", Validators.required],
        });

        this.origin = {
			name: 'Point A',
            lat: -33.77971806012011,
            lng: 151.1334228515625
        }

        this.destination = {
			name: 'Point B',
            lat: -33.85673152928874,
            lng: 151.06613159179688
        }

        this.route = {
            origin: this.origin,
            destination: this.destination
        }
    }

    submitLocationForm(form: any, valid: boolean): void {
        if (!valid) return;
        
    }

    submitTransportForm(form: any, valid: boolean): void {
        if (!valid) return;

        this.transport = {
            typeA: form.typeA,
            typeB: form.typeB,
        }
    }

    searchLocation(point1: boolean): void {
        if (point1) {
            //this.mapService.getLatAndLong()
        } else {
        }
    }

    test(): void {
        this.mapService.getLatAndLng(this.origin.name).subscribe(
            (origin) => this.route.origin = origin,
            () => console.log("ssss"),
            () => console.log("ssss"));

        this.mapService.getLatAndLng(this.destination.name).subscribe(
            (destination) => this.route.destination = destination,
            () => console.log("ssss"),
            () => console.log("ssss"));
    }

    movePointA(marker: any): void {
		this.route.origin.lat = marker.coords.lat;
		this.route.origin.lng = marker.coords.lng;

		this.directive.newDirection(this.route);
		this.durations = DirectionsMapDirective.durations;
		this.distances = DirectionsMapDirective.distances;
    }

    movePointB(marker: any): void {
		this.route.destination.lat = marker.coords.lat;
		this.route.destination.lng = marker.coords.lng;

		this.directive.newDirection(this.route);
		this.durations = DirectionsMapDirective.durations;
		this.distances = DirectionsMapDirective.distances;
	}
}
