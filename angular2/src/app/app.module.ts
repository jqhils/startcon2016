import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AgmCoreModule } from 'angular2-google-maps/core';
import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core/services/google-maps-api-wrapper';

import { DirectionsMapDirective } from './directionsmap.directive';
import { AutoCompleteDirective } from './autocomplete.directive';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent,
        DirectionsMapDirective,
		AutoCompleteDirective 
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyC2MQBQsRWHr2GfckbagJriR45gMlPdIp8',
			region: 'AU',
			libraries: ['places'],
        })
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
