import { Injectable } from '@angular/core';

import { Car } from '../models/car';

@Injectable({ // means that other services can be injected into CarsService
  providedIn: 'root' // tells Angular app to register service with the root module of
})                   // application instead of listing it in the provider
export class CarsService {

  private cars: Car[] = [
    { id: 1, make: 'Ford', model: 'Fusion Hybrid', year: 2019, color: 'blue', price: 45000 },
    { id: 2, make: 'Tesla', model: 'S', year: 2018, color: 'red', price: 100000 },
  ];

  constructor() { }

  all() {
    return this.cars.concat();
  }

  append(car: Car) {
    this.cars = this.cars.concat({
      ...car,
      id: Math.max(...this.cars.map(c => c.id), 0) + 1,
    });
    return this;
  }

  replace(car: Car) {
    const newCars = this.cars.concat();
    const carIndex = this.cars.findIndex( c => c.id === car.id);
    newCars[carIndex] = car;
    this.cars = newCars;
    return this;
  }

  remove(carId: number) {
    this.cars = this.cars.filter(c => c.id !== carId);
    return this;
  }
}
