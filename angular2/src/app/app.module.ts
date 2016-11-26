import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MapService } from './map.service';

import { AgmCoreModule } from 'angular2-google-maps/core';
import { DirectionsMapDirective } from './directionsmap.directive';

@NgModule({
    declarations: [
        AppComponent,
        DirectionsMapDirective 
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBgauW3FJMZnU45GYXaqCT6GLBqkbOQm8s'
        })
    ],
    providers: [ MapService ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
