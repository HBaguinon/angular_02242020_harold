import { Component, OnInit } from '@angular/core';

import { Car } from '../../models/car';
import { CarsService } from '../../services/cars.service';

@Component({
  selector: 'app-car-home',
  templateUrl: './car-home.component.html',
  styleUrls: ['./car-home.component.css']
})
export class CarHomeComponent implements OnInit {

  cars: Car[] = [];

  // sortColName new property
  sortColName = '';

  // new property. Change the model before changing UI
  // Don't just add a new property/field in the Car object. Do this instead:
  editCarId = -1;

  constructor(public carsSvc: CarsService) { }

  ngOnInit(): void {
    this.carsSvc.all().then(cars => {
      this.cars = cars;
    });

    // this.cars = this.carsSvc.all();
  }

  refreshCars() {
    return this.carsSvc.all().then(cars => {
      this.cars = cars;
    });
  }

  doAppendCar(car: Car) {
    // this.cars = this.carsSvc.append(car).all();
    // this.cars = this.carsSvc.all(); // one version

    this.carsSvc
      .append(car)
      .then(() => this.refreshCars()); // This is known as a "Promise Chain"

    // if you broke it down into two lines, it might call all() before append() finishes

    this.editCarId = -1;
  }

  doRemoveCar(carId: number) {
    this.carsSvc
      .remove(carId)
      .then(() => this.carsSvc.all())
      .then(cars => {
        this.cars = cars;
      });
    // this.cars = this.carsSvc.remove(carId).all();
    this.editCarId = -1;
  }

  // Edit step 7
  doEditCar(carId: number) {
    this.editCarId = carId;
  }

  doSortCars(sortColName: string) {
    this.sortColName = sortColName;
  }

  // this is Eric's version
  doReplaceCar(car: Car) {
    this.carsSvc
      .replace(car)
      .then(() => this.carsSvc.all())
      .then(cars => {
        this.cars = cars;
      });
    // this.cars = this.carsSvc.replace(car).all();
    this.editCarId = -1;
  }

  // this is Eric's version
  doCancelCar() {
    this.editCarId = -1;
  }

  // this is Michael's version
  doSaveCar(car: Car) {
    this.cars = this.cars.map(c => (c.id === car.id ? { c, ...car } : c)); // What is this?
    this.editCarId = -1;
  }

  // this is Michael's version
  doCancel() {
    this.editCarId = -1;
  }

}
