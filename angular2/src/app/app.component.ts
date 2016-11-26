import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { MapService } from './map.service';
import { Location, Route } from './location';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    private locationForm: FormGroup;
    private transportForm: FormGroup;

    private pointA: any;
    private pointB: any;

    private temp: boolean = true;

    route: Route;
    transport: any;

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

        let origin: Location = {
            lat: 0,
            lng: 0
        }

        let destination: Location = {
            lat: 0,
            lng: 0
        }

        this.route = {
            origin: origin,
            destination: destination
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

    movePoint(arg1: any, arg2: any): void {
    }

    searchLocation(point1: boolean): void {
        if (point1) {
            //this.mapService.getLatAndLong()
        } else {
        }
    }

    test(): void {
        this.mapService.getLatAndLng(this.pointA.value).subscribe(
            (origin) => this.route.origin = origin,
            () => console.log("ssss"),
            () => console.log("ssss"));

        this.mapService.getLatAndLng(this.pointB.value).subscribe(
            (destination) => this.route.destination = destination,
            () => console.log("ssss"),
            () => console.log("ssss"));
    }
}
