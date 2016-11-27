import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Observable, Subject } from 'rxjs';
import 'rxjs/Rx';

import { DirectionsMapDirective } from './directionsmap.directive';
import { MapService } from './map.service';
import { Location, TransportType, Route } from './location';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    private locationForm: FormGroup;
    private transportForm: FormGroup;

    private origin: Location;
    private destination: Location;

    private route: Route;

    private durations: number[];
    private distances: number[];

	private address: Object;

    @ViewChild(DirectionsMapDirective) directions;

    constructor(private formBuilder: FormBuilder) {
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

    ngOnInit() {
        this.locationForm = this.formBuilder.group({
            origin: ["", Validators.required],
            destination: ["", Validators.required],
        });

        this.transportForm = this.formBuilder.group({
            typeA: ["", Validators.required],
            typeB: ["", Validators.required],
        });
    }

    submitLocationForm(form: any, valid: boolean): void {
        if (!valid) return;

		this.newDirection();
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

	getAddress(autocomplete: any, origin: boolean): void {
		let place = autocomplete.getPlace();
		let coordinate = place.geometry.location;

		if (origin) {
			this.route.origin = {
				lat: coordinate.lat(),
				lng: coordinate.lng()
			}
		} else {
			this.route.destination = {
				lat: coordinate.lat(),
				lng: coordinate.lng()
			}
		}

        this.newDirection();
	}

    movePoint(marker: any, origin: boolean): void {
        if (origin) {
            this.route.origin = {
				lat: marker.coords.lat,
				lng: marker.coords.lng
			}
        } else {
            this.route.destination = {
				lat: marker.coords.lat,
				lng: marker.coords.lng
			}
        }

        this.newDirection();
    }

    newDirection(): void {
        this.directions.newDirection(this.route);
        this.durations = DirectionsMapDirective.durations;
        this.distances = DirectionsMapDirective.distances;
    }
}
