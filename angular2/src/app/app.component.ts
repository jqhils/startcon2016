import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Observable, Subject } from 'rxjs';
import 'rxjs/Rx';

import { DirectionsMapDirective } from './directionsmap.directive';
import { FuelService } from './fuel.service';
import { Location, TransportType, Route, StringResults } from './location';

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

    private results: StringResults[];

    @ViewChild(DirectionsMapDirective) directions;

    constructor(private fuelService: FuelService,
				private formBuilder: FormBuilder) {
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
            types: [ typeA, typeB ],
        }

		this.results = [];
    }

    ngOnInit() {
        this.locationForm = this.formBuilder.group({
            origin: ["", Validators.required],
            destination: ["", Validators.required],
        });

        this.transportForm = this.formBuilder.group({
            typeA: ["DRIVING:", Validators.required],
            typeB: ["TRANSIT:BUS", Validators.required],
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

        this.route.types[0] = {
            mode: a[0],
            modeTypes: a[1] ? [a[1]] : []
        }

        this.route.types[1] = {
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

		this.results = [];

		//TODO Scroll down to page 
		for (let i = 0; i < 2; i++) {
			let mode = "";
			if (this.route.types[i].mode === "DRIVING") {
				mode = "Car";
			} else {
				let modeType = this.route.types[i].modeTypes[0];
				mode = this.toTitleCase(modeType)
			}
			let distance = this.directions.distances[i];
			let duration = this.directions.durations[i];

			this.fuelService.getFuelEfficiency(mode).then((fuelEfficiency) => {
				//TODO Calculate efficiency
				let efficiency = Math.floor(Math.random() * 100);

				this.results[i] = {
					mode: mode,
					distance: distance.text,
					duration: duration.text,
					efficiency: efficiency,
					moreEfficient: true,
					trees: Math.floor(Math.random() * 10) //TODO Obviously this shouldn't be random
				}

				if (this.results[1] && efficiency > this.results[i-1].efficiency) {
					for (let result of this.results) {
						result.moreEfficient = false;
					}
					this.results[i].moreEfficient = true;
				} else {
					this.results[i].moreEfficient = false;
				}
			});
		}
    }

    private toTitleCase(str: string): string
    {
        return str.replace(/\w\S*/g, txt => { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    }

	private createRange(num): number[] {
		var items: number[] = [];
		for(var i = 0; i < num; i++){
			items.push(i);
		}
		return items;
	}
}
