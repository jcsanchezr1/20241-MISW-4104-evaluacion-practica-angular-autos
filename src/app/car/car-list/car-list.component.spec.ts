/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { faker } from "@faker-js/faker";
import { of } from "rxjs";

import { CarListComponent } from "./car-list.component";
import { CarService } from "../car.service";
import { Car } from "../car";

describe("CarListComponent", () => {
  let debug: DebugElement;
  let fixture: ComponentFixture<CarListComponent>;
  let component: CarListComponent;
  let cardService: CarService;
  let carsMock: Array<Car> = [];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [CarListComponent],
      providers: [CarService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarListComponent);
    component = fixture.componentInstance;
    cardService = TestBed.inject(CarService);

    for (let i = 0; i < 3; i++) {
      const car = new Car(
        faker.number.int({ min: 10, max: 100 }),
        faker.string.alphanumeric({ length: { min: 5, max: 10 } }),
        faker.string.alphanumeric({ length: { min: 5, max: 10 } }),
        faker.string.alphanumeric({ length: { min: 5, max: 10 } }),
        faker.number.int({ min: 1990, max: 2025 }),
        faker.number.int({ min: 1, max: 999999 }),
        faker.string.alphanumeric({ length: { min: 5, max: 10 } }),
        faker.string.alphanumeric({ length: { min: 5, max: 10 } })
      );
      carsMock.push(car);
    }
    spyOn(cardService, "geCars").and.returnValue(of(carsMock));
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display table with correct number of rows (3 cars) and (1 header)", () => {
    const tableRows = debug.queryAll(By.css("tbody tr"));
    expect(tableRows.length).toBe(3);
    const headerRow = debug.queryAll(By.css("thead tr"));
    expect(headerRow.length).toBe(1);
  });
});
