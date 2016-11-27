import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { Location } from './location';

@Injectable()
export class MapService {
    API_KEY: string = "AIzaSyC2MQBQsRWHr2GfckbagJriR45gMlPdIp8";

    constructor(private http: Http) {}

    public getSuggestion(place: string): Observable<string[]> {
        if (!place) return Observable.of<string[]>([]);

        let query = encodeURIComponent(place)
        let url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&types=geocode&key=${this.API_KEY}`

        return this.http.get(url).map((response) => {
            let object = response.json() || {};
            let output = [];
            //for (let i = 0; i < 5 && i < object.results.length-1; i++) {
            for (let i = 0; i < 5 && i < object.predictions.length-1; i++) {
                output.push(object.predictions[i].description);
            }
            return output
        });
    }

    public getLatAndLng(place: string): Observable<Location> {
        if (!place) return;

        let query = encodeURIComponent(place);
        let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${this.API_KEY}`

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
