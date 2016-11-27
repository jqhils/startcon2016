import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Observable, Subject } from 'rxjs';
import 'rxjs/Rx';

import { DirectionsMapDirective } from './directionsmap.directive';
import { MapService } from './map.service';
import { Location, TransportType, Route } from './location';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit, OnDestroy {
    private locationForm: FormGroup;
    private transportForm: FormGroup;

    private origin: Location;
    private destination: Location;

    private route: Route;

    private suggestStream1: Subject<string>;
    private suggestStream2: Subject<string>;
    private suggestions1: Observable<string[]>;
    private suggestions2: Observable<string[]>;

    private durations: number[];
    private distances: number[];

    @ViewChild(DirectionsMapDirective) directions;

    constructor(private mapService: MapService,
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
            typeA: typeA,
            typeB: typeB,
        }

        this.suggestStream1 = new Subject<string>();
        this.suggestStream2 = new Subject<string>();
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

        this.suggestions1 = this.suggestStream1
        .debounceTime(300)
        .distinctUntilChanged()
        .switchMap(term => term ? this.mapService.getSuggestion(term) : Observable.of<string[]>([]))
        .catch(error => {
            console.log(error)
            return Observable.of<string[]>([])
        });

        this.suggestions2 = this.suggestStream2
        .debounceTime(300)
        .distinctUntilChanged()
        .switchMap(term => term ? this.mapService.getSuggestion(term) : Observable.of<string[]>([]))
        .catch(error => {
            console.log(error)
            return Observable.of<string[]>([])
        });
    }

    ngOnDestroy() {
        this.suggestStream1.unsubscribe();
        this.suggestStream2.unsubscribe();
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

    searchLocation(place: string, origin: boolean): void {
        if (origin) this.suggestStream1.next(place);
        else this.suggestStream2.next(place);
    }

    updateText(form: FormControl, place: string) {
        form.value = place;
        this.suggestStream1.next("");
        this.suggestStream2.next("");
    }

    movePoint(marker: any, origin: boolean): void {
        if (origin) {
            this.route.origin.lat = marker.coords.lat;
            this.route.origin.lng = marker.coords.lng;
        } else {
            this.route.destination.lat = marker.coords.lat;
            this.route.destination.lng = marker.coords.lng;
        }

        this.newDirection();
    }

    newDirection(): void {
        this.directions.newDirection(this.route);
        this.durations = DirectionsMapDirective.durations;
        this.distances = DirectionsMapDirective.distances;
    }
}
