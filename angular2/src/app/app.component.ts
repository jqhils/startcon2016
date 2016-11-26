import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { DirectionsMapDirective } from './directionsmap.directive';
import { MapService } from './map.service';
import { Location, TransportType, Route } from './location';

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

	@ViewChild(DirectionsMapDirective) directions;

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
            lat: -33.77971806012011,
            lng: 151.1334228515625
        }

        this.destination = {
            lat: -33.85673152928874,
            lng: 151.06613159179688
        }

		let typeA: TransportType = {
			mode: "DRIVING",
			modeTypes: []
		}

		let typeB: TransportType = {
			mode: "TRANSIT",
			modeTypes: ["BUS"]
		}

        this.route = {
            origin: this.origin,
            destination: this.destination,
			typeA: typeA,
			typeB: typeB,
        }
    }

    submitLocationForm(form: any, valid: boolean): void {
        if (!valid) return;

        this.mapService.getLatAndLng(form.origin).subscribe(
            (origin) => {
				this.route.origin = origin,
				this.newDirection()
			},
            () => console.log("Error"),
            () => console.log("Done"));

        this.mapService.getLatAndLng(form.destination).subscribe(
            (destination) => {
				this.route.destination = destination
				this.newDirection();
			},
            () => console.log("Error"),
            () => console.log("Done"));
    }

    submitTransportForm(form: any, valid: boolean): void {
        if (!valid) return;

		let a = form.typeA.split(":");
		let b = form.typeB.split(":");

		this.route.typeA = {
			mode: a[0],
			modeTypes: a[1] ? [a[1]] : []
		}

		this.route.typeB = {
			mode: b[0],
			modeTypes: b[1] ? [b[1]] : []
		}

		this.newDirection();
    }

    searchLocation(point1: boolean): void {
        if (point1) {
            //this.mapService.getLatAndLong()
        } else {
        }
    }

    movePointA(marker: any): void {
		this.route.origin.lat = marker.coords.lat;
		this.route.origin.lng = marker.coords.lng;

		this.newDirection();
    }

    movePointB(marker: any): void {
		this.route.destination.lat = marker.coords.lat;
		this.route.destination.lng = marker.coords.lng;
		
		this.newDirection();
	}

	newDirection(): void {
		this.directions.newDirection(this.route);
		this.durations = DirectionsMapDirective.durations;
		this.distances = DirectionsMapDirective.distances;
	}
}
