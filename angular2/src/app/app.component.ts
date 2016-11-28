import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Observable, Subject } from 'rxjs';
import 'rxjs/Rx';

import { DirectionsMapDirective } from './directionsmap.directive';
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

    private transportTypes: string[];
    //private distances: string[];

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

        this.transportTypes = [];
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

        //TODO Scroll down to page 
        let hour = Math.floor(this.directions.durations[0] / 60);
        let minute = this.directions.durations[0] % 60;
        if (this.route.typeA.mode === "DRIVING") {
            this.transportTypes[0] = "Car";
        } else {
            let modeType = this.route.typeA.modeTypes[0];
            this.transportTypes[0] = this.toTitleCase(modeType)
        }

        hour = Math.floor(this.directions.durations[1] / 60);
        minute = this.directions.durations[1] % 60;
        if (this.route.typeB.mode === "DRIVING") {
            this.transportTypes[1] = "Car";
        } else {
            let modeType = this.route.typeB.modeTypes[0];
            this.transportTypes[1] = this.toTitleCase(modeType)
        }
    }

    private toTitleCase(str: string): string
    {
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }
}
