import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { Location } from './location';

declare var XMLHttpRequest: any;

@Injectable()
export class MapService {
    API_KEY: string = "AIzaSyBgauW3FJMZnU45GYXaqCT6GLBqkbOQm8s";

    constructor(private http: Http) {}

    public getSuggestion(place: string): Observable<any> {
        let query = encodeURIComponent(place)
        let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${this.API_KEY}`

        return this.http.get(url).map((response) => {
            let object = response.json().data || {};
			console.log(object);
            return object
        });
    }

    public getLatAndLng(place: string): Observable<Location> {
        let query = encodeURIComponent(place);
        let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${this.API_KEY}`

        return this.http.get(url).map((response) => {
            let object = response.json() || {}
            let location: Location = {
                lat: object.results[0].geometry.location.lat,
                lng: object.results[0].geometry.location.lng
            }
            return location;
        });
    }
}
