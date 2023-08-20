import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateParkingPlotComponent } from './create-parking-plot.component';

describe('CreateParkingPlotComponent', () => {
  let component: CreateParkingPlotComponent;
  let fixture: ComponentFixture<CreateParkingPlotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateParkingPlotComponent]
    });
    fixture = TestBed.createComponent(CreateParkingPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
