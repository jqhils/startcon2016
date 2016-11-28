import { Injectable } from '@angular/core';

//TODO These numbers are obviously fake
const CAR_EFFICIENCY = 95;
const BUS_EFFICIENCY = 45;
const TRAIN_EFFICIENCY = 25;

@Injectable()
export class FuelService {

	getFuelEfficiency(mode: string): Promise<string> {
		switch (mode) {
			case "Car":
				//TODO Http request with car model
				return Promise.resolve(CAR_EFFICIENCY);
			case "Bus":
				return Promise.resolve(BUS_EFFICIENCY);
			case "Train":
				return Promise.resolve(TRAIN_EFFICIENCY);
		}
	}
}
