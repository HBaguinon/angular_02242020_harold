import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Car } from '../models/car';

@Injectable({ // means that other services can be injected into CarsService
  providedIn: 'root' // tells Angular app to register service with the root module of
})                   // application instead of listing it in the provider
export class CarsService {

  private cars: Car[] = [
    { id: 1, make: 'Ford', model: 'Fusion Hybrid', year: 2019, color: 'blue', price: 45000 },
    { id: 2, make: 'Tesla', model: 'S', year: 2018, color: 'red', price: 100000 },
  ];

  private sortColName = '';

  constructor(private httpClient: HttpClient) { }

  setSortColName(sortColName: string) {
    this.sortColName = sortColName;
  }

  all() {
    // return this.cars.concat();
    if (this.sortColName.length > 0) {
      return this.httpClient
        .get<Car[]>('http://localhost:4250/cars?_sort=' + this.sortColName).toPromise();
    } else {
      return this.httpClient
        .get<Car[]>('http://localhost:4250/cars').toPromise();
    }
  }

  append(car: Car) {
    // this.cars = this.cars.concat({
    //   ...car,
    //   id: Math.max(...this.cars.map(c => c.id), 0) + 1,
    // });
    // return this;

    return this.httpClient.post<Car>('http://localhost:4250/cars', car).toPromise();
  }

  replace(car: Car) {
    // const newCars = this.cars.concat();
    // const carIndex = this.cars.findIndex( c => c.id === car.id);
    // newCars[carIndex] = car;
    // this.cars = newCars;
    // return this;

    return this.httpClient.put<Car>('http://localhost:4250/cars/' + car.id, car).toPromise();
  } // return type can be Car or void

  remove(carId: number) {
    // this.cars = this.cars.filter(c => c.id !== carId);
    // return this;

    return this.httpClient.delete<void>('http://localhost:4250/cars/' + carId).toPromise();
  }

}
