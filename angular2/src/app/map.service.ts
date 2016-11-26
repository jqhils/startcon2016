import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { Jsonp } from '@angular/http';

import { Location } from './location';

@Injectable()
export class MapService {
    API_KEY: string = "AIzaSyBgauW3FJMZnU45GYXaqCT6GLBqkbOQm8s";

    constructor(private json: Jsonp) {}

    public getSuggestion(place: string): Observable<any> {
        let query = encodeURI(place)
        let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${this.API_KEY}`
        return this.json.get(url).map((response) => {
            let object = response.json().data || {};
            return object
        });
    }

    public getLatAndLng(place: string): Observable<Location> {
        let query = encodeURI(place)
        let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${this.API_KEY}`
        return this.json.get(url).map((response) => {
            let object = response.json().data || {}
            let location: Location = {
                name: place,
                lat: object.results[0].geometry.location.lat,
                lng: object.results[0].geometry.location.lng
            }
            return location;
        });
    }
}
